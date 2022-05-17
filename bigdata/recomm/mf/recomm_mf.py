import pandas as pd
from sklearn.utils import shuffle
from scipy.sparse import csr_matrix
from sqlalchemy import text
from bson.json_util import dumps


def recomm_mf(app, mongodb, userid):

    ##################
    # 데이터 불러오기 #
    ##################


    # 유저의 id번호, tier 불러오기
    user_id_tier = app.mysql_db.execute(text("""
        SELECT id, tier FROM member WHERE boj_id = :userid
    """), {'userid': userid}).fetchone()
    user_id = user_id_tier[0]
    user_tier = user_id_tier[1]
    
    # 유저의 solving log 불러오기
    collection = mongodb.solving_log
    solving_log = collection.find({'memberId': user_id }, {'_id':0, 'problemId':1})
    solved_id_list = [s['problemId'] for s in list(solving_log)]


    #############
    # 문제 추천 #
    #############


    # 추천 문제 데이터 불러오기
    ## 해당 티어, 해당 유저
    collection = mongodb.member_problem_mf
    problem_tag = collection.find({
        '$and': [
            {'tier': user_tier },
            {'data.memberId': user_id },
            # {'data.problemId': {'$nin': solved_id_list}},
            # {'data.predicted_r': {'$gte': 0.5}},
    ]})
    problem_tag_list = list(problem_tag)
    
    # 푼 문제 제외
    problem_id_list = []
    for problem_t in problem_tag_list[0]['data']:        
        cond = problem_t['problemId'] not in solved_id_list
        # cond = problem_t['predicted_r'] >= 0.5
        if cond:
            problem_id_list.append(problem_t)

    ## 유저 티어에 해당하는 추천 문제 데이터 없는 경우 return
    if len(problem_id_list) == 0:
        return 'empty'
    
    # 추천 문제 리스트 df 형태로 변형 및 predicted_r 높은순으로 정렬
    problem_id_list = problem_id_list
    problem_id_df = pd.DataFrame(problem_id_list).sort_values('predicted_r', ascending=False)
    
    # 난이도 필터링


    # 추천문제 랜덤추출
    recomm_df = problem_id_df.sample(10)
    
    # 추천문제 문제데이터 결합
    collection = mongodb.problem_tag_nest
    recomm_problems = collection.find({'problemId': { '$in': recomm_df['problemId'].tolist() }})

    ### 추천 문제 전달 ###
    recomm_list = list(recomm_problems)
    # print(recomm_list)
    # 즐겨찾기 정보 추가
    for r in recomm_list:
        is_marked = app.mysql_db.execute(text("""
            SELECT problem_id FROM problem_mark
            WHERE member_id = :user_id AND problem_id = :problem_id 
        """), {'user_id': user_id, 'problem_id': r['problemId']}).fetchone()
        marked = is_marked
        if marked:
            if marked[0] == r['problemId']:
                r['problemMark'] = True
        else:
            r['problemMark'] = False

    recomm_json = dumps(recomm_list, ensure_ascii=False)
    
    return recomm_json