import pandas as pd
import json
from sqlalchemy import text

def user_freq_tag(app, mongodb, userid):
    ##################
    # 데이터 불러오기 #
    ##################

    # 유저의 id번호 불러오기
    user_id = app.mysql_db.execute(text("""
        SELECT id FROM member WHERE boj_id = :userid
    """), {'userid': userid}).fetchone()[0]
    
    # 유저의 solving 로그 불러오기
    solving_log = app.mysql_db.execute(text("""
        SELECT s.*
        FROM solving_log s
        JOIN (
            SELECT id, member_id
            FROM solving_log
            WHERE member_id = :user_id
        ) AS r ON s.id = r.id 
    """), {'user_id': user_id}).fetchall()
    solving_log = [{
        'id': s['id'],
        'problem_id': s['problem_id'],
        'status': s['status'],
    } for s in solving_log]
    solving_log = json.dumps(solving_log, ensure_ascii=False)
    solved_df = pd.read_json(solving_log)

    # 내가 푼 문제-태그 정보(problem_tag) 불러오기
    collection = mongodb.problem_tag
    problem_tag = collection.find({'problem_id': { '$in': solved_df['problem_id'].tolist() }})
    problem_tag_df = pd.DataFrame(problem_tag)
    problem_tag_df = problem_tag_df.astype({'boj_tag_id': 'int'})
    print(problem_tag_df)

    # 풀이 상태 정보 + 문제-태그 정보
    problem_tag_df = pd.merge(solved_df, problem_tag_df)


    ####################
    # 많이 푼 태그 분석 #
    ####################

    
    # 푼 문제 목록 추출
    problem_tag_df_solved = problem_tag_df.loc[problem_tag_df['status']=='"solved"']
    # 태그별로 문제 많이 푼 순으로 태그 나열
    solved_tag = problem_tag_df_solved.groupby('boj_tag_id').count().sort_values('boj_id', ascending=False).reset_index()['boj_tag_id']
    # list 형태로 변형
    solved_tag_list = list(solved_tag)

    # 푼 문제 수 산출
    solved_cnts = []
    for solved_tag in solved_tag_list:
        cond = (problem_tag_df_solved['boj_tag_id']==solved_tag)
        cond_list = list(problem_tag_df_solved.loc[cond]['boj_tag_id'])
        solved_cnts.append(len(cond_list))
    #     print(f'{solved_tag}번 태그 문제를 {len(cond_list)}개 풀었습니다.')
    #     print(f'문제목록:\n{cond_list}\n')
    # print(f'푼 문제 태그 목록:\n{solved_tag_list}\n')
    # print(f'푼 문제 수:\n{solved_cnts}')

    # 태그별 해결 문제수 df 생성
    df_freq = pd.DataFrame({
        'boj_tag_id': solved_tag_list,
        'solvedcnt': solved_cnts
    })
    # 문제 많이 푼 순으로 태그 10개 추출
    df_freq = df_freq[:10]

    # 태그 정보 불러오기
    tags = app.mysql_db.execute(text("""
        SELECT * FROM tag 
    """)).fetchall()
    tags = [{
        'boj_tag_id': t['boj_tag_id'],
        'boj_key': t['boj_key'],
        'name': t['name'],
    } for t in tags]

    # 취약태그 + 태그 정보
    tags = pd.DataFrame(tags)
    df_freq = pd.merge(df_freq, tags)[:10]
    
    # json 형태로
    freq_json = df_freq.to_json(orient='records')
    freq_list = json.dumps(json.loads(freq_json), indent="\t", ensure_ascii=False)
    return freq_list