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
    solving_log = collection.find({'member_id': user_id }, {'_id':0, 'problem_id':1})
    solved_id_list = [s['problem_id'] for s in list(solving_log)]


    #############
    # 문제 추천 #
    #############


    # 추천 문제 데이터 불러오기
    ## 해당 티어, 해당 유저, 아직 안푼, 0.5점 이상
    collection = mongodb.member_problem_mf
    problem_tag = collection.find({
        '$and': [
            {'tier': user_tier },
            {'data.member_id': user_id },
            {'data.problem_id': {'$nin': solved_id_list}},
            {'data.predicted_r': {'$gte': 0.5}},
    ]})
    problem_id_list = list(problem_tag)

    ## 유저 티어에 해당하는 추천 문제 데이터 없는 경우 return
    if len(problem_id_list) == 0:
        return 'empty'
    
    # 추천 문제 리스트 df 형태로 변형 및 predicted_r 높은순으로 정렬
    problem_id_list = problem_id_list[0]['data']
    problem_id_df = pd.DataFrame(problem_id_list).sort_values('predicted_r', ascending=False)
    
    # 난이도 필터링


    # 추천문제 랜덤추출
    recomm_df = problem_id_df.sample(10)
    
    # 추천문제 문제데이터 결합
    collection = mongodb.problem_tag_nest
    recomm_problems = collection.find({'problem_id': { '$in': recomm_df['problem_id'].tolist() }})

    ### 추천 문제 전달 ###
    recomm_list = list(recomm_problems)
    recomm_json = dumps(recomm_list, ensure_ascii=False)
    
    return recomm_json