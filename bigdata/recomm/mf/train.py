import pandas as pd
from sklearn.utils import shuffle
from scipy.sparse import csr_matrix
from sqlalchemy import text
from recomm.mf import model
import json



def train_level(app, mongodb):
    res_json = []
    # 난이도별로 모델 생성
    # for i in range(1, 31):
    for i in range(1):
        tiers = list(map(str, [i-1, i, i+1]))
        # tiers = [3, 9, 14]


        ##################
        # 데이터 불러오기 #
        ##################


        # 티어에 해당하는 유저 id 목록 불러오기
        query = "SELECT id FROM member WHERE tier IN (%s, %s, %s);"
        user_ids = app.mysql_db.execute(query, tiers)
        user_ids = [{
            'user_id': i['id'],
        } for i in user_ids]

        # 해당 티어에 유저 없거나 한명밖에 없는 경우
        if len(user_ids) <= 1:
            print(f'no user in tier: {tiers}')
            continue

        # 유저들의 solving 로그 불러오기
        user_id_list = [u['user_id'] for u in user_ids]
        collection = mongodb.solving_log
        solving_log = collection.find({'member_id': { '$in': user_id_list }})
    
        # member_id | problem_id | status df 생성
        R_df = pd.DataFrame(solving_log)\
            .drop(columns='_id')\
            .set_index('id', drop=True)
        R_df['status'] = 1


        ################
        # 데이터 전처리 #
        ################


        # data split
        ## 셔플
        train_size = 0.75
        R_df = shuffle(R_df, random_state=1).drop_duplicates()
        cutoff = int(train_size * len(R_df))
        ## 분리
        R_train_df = R_df.iloc[:cutoff]
        R_valid_df = R_df.iloc[cutoff:]

        # df 형태 변형
        R_train_df = R_train_df.pivot(index='member_id', columns='problem_id', values='status').fillna(0)
        R_valid_df = R_valid_df.pivot(index='member_id', columns='problem_id', values='status').fillna(0)

        # R 매핑 딕셔너리 생성
        ## 문제번호 - idx
        problem_id_idx = {}
        idx_problem_id = {}

        # enumerate로 df 칼럼 인덱스 번호와 칼럼번호 저장
        for i, prob_id in enumerate(R_train_df):
            problem_id_idx[prob_id] = i
            idx_problem_id[i] = prob_id

        ## 회원번호 - idx
        member_id_idx = {}
        idx_member_id = {}

        for i, mem_id in enumerate(R_train_df.T):
            member_id_idx[mem_id] = i
            idx_member_id[i] = mem_id

        # sparse matrix로 변형
        R_train = csr_matrix(R_train_df)
        R_valid = csr_matrix(R_valid_df)


        ############
        # 모델 학습 #
        ############

        
        R_predicted = model.train_mf(res_dir='./recomm/mf/data', R_train=R_train, R_valid=R_valid)
        
        # print("U x V:")
        # print(R_predicted)
        # print(R_predicted)
        

        ############
        # 결과 저장 #
        ############

        res_list = []
        for idx1, u in enumerate(R_predicted):
            for idx2, v in enumerate(u):        
                res_list.append({
                    'member_id': idx_member_id[idx1],
                    'problem_id': idx_problem_id[idx2],
                    'predicted_r': v,
                })

        # mongoDB 데이터 저장
        res_json.append({
            'tier': i,
            'data': res_list,
        })

    if len(res_json) != 0:
        print('Could not make mf recomm table!')
        res_json = json.dumps(res_json, ensure_ascii=False)
        res_json_loaded = json.loads(res_json)
        collection = mongodb.member_problem_mf
        collection.delete_many({})
        collection.insert_many(res_json_loaded)

    return res_json



# def train_model(R_df):

#     ################
#     # 데이터 전처리 #
#     ################


#     # data split
#     ## 셔플
#     train_size = 0.75
#     R_df = shuffle(R_df, random_state=1).drop_duplicates()
#     cutoff = int(train_size * len(R_df))
#     ## 분리
#     R_train_df = R_df.iloc[:cutoff]
#     R_valid_df = R_df.iloc[cutoff:]

#     # df 형태 변형
#     R_train_df = R_train_df.pivot(index='member_id', columns='problem_id', values='status').fillna(0)
#     R_valid_df = R_valid_df.pivot(index='member_id', columns='problem_id', values='status').fillna(0)

#     # R 매핑 딕셔너리 생성
#     ## 문제번호 - idx
#     problem_id_idx = {}
#     idx_problem_id = {}

#     # enumerate로 df 칼럼 인덱스 번호와 칼럼번호 저장
#     for i, prob_id in enumerate(R_train_df):
#         problem_id_idx[prob_id] = i
#         idx_problem_id[i] = prob_id

#     ## 회원번호 - idx
#     member_id_idx = {}
#     idx_member_id = {}

#     for i, mem_id in enumerate(R_train_df.T):
#         member_id_idx[mem_id] = i
#         idx_member_id[i] = mem_id

#     # sparse matrix로 변형
#     R_train = csr_matrix(R_train_df)
#     R_valid = csr_matrix(R_valid_df)


#     ############
#     # 모델 학습 #
#     ############

    
#     R_predicted = model.train_mf(res_dir='./recomm/mf/data', R_train=R_train, R_valid=R_valid)
    
#     # print("U x V:")
#     # print(R_predicted)
#     # print(R_predicted)
    

#     ############
#     # 결과 저장 #
#     ############

#     res_list = []
#     for idx1, u in enumerate(R_predicted):
#         for idx2, v in enumerate(u):        
#             res_list.append({
#                 'member_id': idx_member_id[idx1],
#                 'problem_id': idx_problem_id[idx2],
#                 'predicted_r': v,
#             })
    
#     return res_list

    # V 50 미만인 경우(콜드스타트)
    # 0.5 미만 제거
    # 난이도 필터링
    # K값 탐색
    # valid 추가