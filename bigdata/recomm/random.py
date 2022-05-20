from sqlalchemy import text
from bson.json_util import dumps
import random

def recomm_random(app, mongodb, userid):
    ##################
    # 데이터 불러오기 #
    ##################

    # 유저의 id번호, 티어 불러오기
    id_tier = app.mysql_db.execute(text("""
        SELECT id, tier FROM member WHERE id = :userid
    """), {'userid': userid}).fetchall()
    id_tier = [{
        'user_id': i['id'],
        'tier': i['tier'],
    } for i in id_tier]
    user_id = id_tier[0]['user_id']
    # tier = id_tier[0]['tier']
    # tiers = [tier-1, tier, tier+1]
    
    # 유저의 solving log 불러오기
    collection = mongodb.solving_log
    solving_log = collection.find({
        '$and': [{'memberId': user_id }, {'status': 'solved'}]},
        {'_id':0, 'problemId':1})
    solved_id_list = [s['problemId'] for s in list(solving_log)]


    #############
    # 문제 추천 #
    #############

    # 문제-태그 정보(problem_tag) 불러오기
    # 아직 안풀었고 내 티어 +-1 난이도 문제 10개 랜덤 추출
    collection = mongodb.problem_tag_nest
    problem = collection.aggregate([
        {'$match': {'problemId': { '$nin': solved_id_list}}},
        # {'$match': {'level': {'$in': tiers}}},
        {'$sample': {'size': 10}},
        ])

    # json으로 형태변환
    problem = list(problem)

    # 즐겨찾기 정보 추가
    for r in problem:
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
            
    problem = dumps(problem)
    
    return problem

def recomm_random_solved(app, mongodb, userid):
    ##################
    # 데이터 불러오기 #
    ##################

    # 유저의 id번호, 티어 불러오기
    id_tier = app.mysql_db.execute(text("""
        SELECT id, tier FROM member WHERE id = :userid
    """), {'userid': userid}).fetchall()
    id_tier = [{
        'user_id': i['id'],
        'tier': i['tier'],
    } for i in id_tier]
    user_id = id_tier[0]['user_id']
    # tier = id_tier[0]['tier']
    # tiers = [tier-1, tier, tier+1]
    
    # 유저의 solving log 불러오기
    # collection = mongodb.solving_log
    # solving_log = collection.find(
    #     {'$and': [{'memberId': user_id }, {'status': 'solved'}]},
    #     {'_id':0, 'problemId':1}
    # )
    solving_log = app.mysql_db.execute(text("""
        SELECT s.problem_id
        FROM solving_log s
        JOIN (
            SELECT id, member_id
            FROM solving_log
            WHERE member_id = :user_id
            AND status = 'solved'
        ) AS r ON s.id = r.id 
    """), {'user_id': user_id}).fetchall()
    solved_id_list = [s[0] for s in list(solving_log)]
    
    if len(solved_id_list) == 0:
        print('no solved problem')
        return 'empty'

    #############
    # 문제 추천 #
    #############

    # 문제-태그 정보(problem_tag) 불러오기
    # 이미 풀었고 내 티어 +-1 난이도 문제 10개 랜덤 추출
    collection = mongodb.problem_tag_nest
    problem = collection.aggregate([
        {'$match': {'problemId': { '$in': solved_id_list}}},
        # {'$match': {'level': {'$in': tiers}}},
        {'$sample': {'size': 10}},
        ])

    # json으로 형태변환
    problem = list(problem)
    print(len(problem))
    if len(problem) == 0: return 'empty'
    # if len(problem) >= 10: random.sample(problem, 10)
    
    # 즐겨찾기 정보 추가
    for r in problem:
        is_marked = app.mysql_db.execute(text("""
            SELECT problem_id FROM problem_mark
            WHERE member_id = :user_id AND problem_id = :problem_id 
        """), {'user_id': user_id, 'problem_id': r['problemId']}).fetchone()
        marked = is_marked
        # print(marked)
        if marked:
            if marked[0] == r['problemId']:
                r['problemMark'] = True
        else:
            r['problemMark'] = False

    problem = dumps(problem)
    
    return problem