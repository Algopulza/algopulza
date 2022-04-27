import pandas as pd
from sklearn.utils import shuffle
from scipy.sparse import csr_matrix
from model import train_mf

def train(R):
    # 데이터 df로 변형
    R_df = pd.DataFrame(R)
    R_df['solved'] = 1

    # data split
    ## 셔플
    train_size = 0.75
    R_df = shuffle(R_df, random_state=1)
    cutoff = int(train_size * len(R_df))

    ## 분리
    R_train_df = R_df.iloc[:cutoff]
    R_valid_df = R_df.iloc[cutoff:]

    # df 형태 변형
    R_train_df = R_train_df.pivot(index='member_id', columns='problem_id', values='solved').fillna(0)
    R_valid_df = R_valid_df.pivot(index='member_id', columns='problem_id', values='solved').fillna(0)

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


    R_predicted = train_mf(res_dir='./recomm/mf/data', R_train=R_train, R_valid=R_valid)
    
    print("U x V:")
    print(R_predicted)


    # V 50 미만인 경우(콜드스타트)
    # 0.5 미만 제거
    # 난이도 필터링
    # K값 탐색
    # valid 추가