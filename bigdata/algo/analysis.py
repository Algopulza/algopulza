import pandas as pd
import json
from sqlalchemy import text

def core_tag(app, mongodb, userid):
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
        'problemId': s['problem_id'],
        'status': s['status'],
    } for s in solving_log]
    solving_log = json.dumps(solving_log, ensure_ascii=False)
    solved_df = pd.read_json(solving_log)

    # 해결한 핵심태그 문제-태그 정보(problem_tag) 불러오기
    bojTagIds = [6, 7, 25, 33, 97, 102, 126, 127]
    tagIds = [3, 4, 16, 21, 43, 46, 54, 55]
    collection = mongodb.problem_tag
    problem_tag = collection.find(
        {'$and':[
            {'bojTagId': { '$in': bojTagIds }},
            {'problemId': { '$in': solved_df['problemId'].tolist() }}
            ]
        })
    problem_tag_df = pd.DataFrame(problem_tag)
    # problem_tag_df = problem_tag_df.astype({'bojTagId': 'int'})

    # 풀이 상태 정보 + 문제-태그 정보
    problem_tag_df = pd.merge(solved_df, problem_tag_df)
    problem_tag_df = problem_tag_df.astype({'bojTagId': 'int'})

    # 태그별 총 문제 수
    collection = mongodb.tagId_count
    tag_total = collection.find({'tagId': { '$in': tagIds }})
    tag_total_df = pd.DataFrame(tag_total)
    tag_total_df['bojTagId'] = bojTagIds


    ################
    # 해결현황 분석 #
    ################

    
    # 푼 문제 목록 추출
    bojTagIds = [6, 7, 25, 33, 97, 102, 126, 127]
    problem_tag_df_solved = problem_tag_df.loc[problem_tag_df['status']=='solved']
    problem_tag_df_solved = problem_tag_df_solved.loc[problem_tag_df_solved['bojTagId'].isin(bojTagIds) ]
    # 태그별로 문제 적게 푼 순으로 태그 나열
    solved_tag_df = problem_tag_df_solved.groupby('bojTagId')['id'].count().reset_index()
    # 태그별 해결한 문제 수 + 태그별 총 문제 수
    solved_tag_df = pd.merge(solved_tag_df, tag_total_df[['bojTagId','tagId','probCnt']])
    # (해결한 문제 수)/(총 문제 수) 비율 산출
    # solved_tag_df['core_tag_ratio'] = round(solved_tag_df['id'] / solved_tag_df['probCnt'] * 100, 2)
    solved_tag_df['solvedcnt'] = round(solved_tag_df['id'] / solved_tag_df['probCnt'] * 100, 2)


    # 태그 정보 불러오기
    tags = app.mysql_db.execute(text("""
        SELECT * FROM tag
    """)).fetchall()
    tags = [{
        'bojTagId': t['boj_tag_id'],
        'bojKey': t['boj_key'],
        'name': t['name'],
    } for t in tags]

    # 취약태그 + 태그 정보
    tags = pd.DataFrame(tags)
    core_tags_df = pd.merge(solved_tag_df, tags)
    
    # json 형태로
    vul_json = core_tags_df.to_json(orient='records')
    vul_list = json.dumps(json.loads(vul_json), indent="\t", ensure_ascii=False)
    return vul_list