import pandas as pd
import json
import random
from sqlalchemy import text
from bson.json_util import dumps

def recomm_freq_tag(app, mongodb, userid):
    ##################
    # 데이터 불러오기 #
    ##################

    # 유저의 id번호 불러오기
    user_id = app.mysql_db.execute(text("""
        SELECT id FROM member WHERE name = :userid
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
    problem_tag_df = problem_tag_df.astype({'tag_id': 'int'})

    # 풀이 상태 정보 + 문제-태그 정보
    problem_tag_df = pd.merge(solved_df, problem_tag_df)


    ##################
    # 많이푼문제 분석 #
    ##################


    # 푼 문제 목록 추출
    problem_tag_df_solved = problem_tag_df.loc[problem_tag_df['status']=='"solved"']
    # 태그별로 문제 많이 푼 순으로 태그 나열
    solved_tag = problem_tag_df_solved.groupby('tag_id').count().sort_values('problem_id', ascending=False).reset_index()['tag_id']
    # list 형태로 변형
    solved_tag_list = list(solved_tag)
    # 푼 문제 평균 레벨 추출
    solved_levels = {}
    for solved_tag in solved_tag_list:
        cond = (problem_tag_df_solved['tag_id']==solved_tag)
        cond_list = list(problem_tag_df_solved.loc[cond]['level'])
        solved_levels[solved_tag] = int(sum(cond_list)/len(cond_list))

    # print('푼 문제 태그 목록 : ', solved_tag_list)
    # print('푼 문제 난이도(내림차순) : ', solved_levels)

    # 추천할 태그 목록
    recomm_tag_list = solved_tag_list[:10]
    recomm_tag_list = list(set(recomm_tag_list))
    print('추천 태그 목록: ', recomm_tag_list)


    ##################
    # 문제 추천 #
    ##################


    # 푼 문제 제외
    collection = mongodb.problem_tag
    problem_tag = collection.find({'problem_id': { '$nin': problem_tag_df_solved['problem_id'].tolist() }})
    df = pd.DataFrame(problem_tag).fillna(0)
    df = df.astype({'tag_id': 'int'})

    # 빈 df 생성
    recomm_df = pd.DataFrame(columns=df.columns)

    # 태그
    for tag in recomm_tag_list:
        # 태그 해결한 적 있다면 해당 해결 태그 난이도 저장
        if tag in solved_levels:
            tag_level = solved_levels[tag]
        else:
            print('error')
            tag_level = 0
        # print('tag: ', tag, 'tag level: ', tag_level)
        
        # 추천 문제 난이도 태그별로 조정(level +- 2)
        recomm_tag_level = [tag_level]
        for i in range(2):
            recomm_tag_level.append(tag_level+(i+1))
            if tag_level-(i+1) >= 0:
                recomm_tag_level.append(tag_level-(i+1))
        # print('recomm tag levels: ', sorted(recomm_tag_level))
        
        # 태그가 일치하면서 해당 난이도에 포함되는 문제 추출
        tmp_df = df.loc[(df['tag_id']==tag)&(df['level'].isin(recomm_tag_level))]
        # 푼사람 많은 순, 평균시도횟수 적은순으로 문제 10개 추출
        tmp_df = tmp_df.sort_values(['accepted_count', 'average_try_count'], ascending=[False, True])[:10]
        # df row 추가
        recomm_df = pd.concat([recomm_df, tmp_df])

    # 중복 문제 제거 후 정렬
    recomm_df = recomm_df.drop_duplicates('problem_id').reset_index()
    recomm_df = recomm_df.sort_values(['accepted_count', 'average_try_count'], ascending=[False, True])

    # 추천 문제 리스트 추출
    collection = mongodb.problem_tag_nest
    recomm_problems = collection.find({'problem_id': { '$in': recomm_df['problem_id'].tolist() }})

    ### 추천 문제 10개 랜덤 추출 및 전달 ###
    recomm_list = list(recomm_problems)
    recomm_list = random.sample(recomm_list, 10)
    recomm_json = dumps(recomm_list, ensure_ascii=False)
    return recomm_json