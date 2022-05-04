from sqlalchemy import text
from bson.json_util import dumps

def recomm_random(app, mongodb, userid):
    ##################
    # 데이터 불러오기 #
    ##################

    # 유저의 id번호, 티어 불러오기
    id_tier = app.mysql_db.execute(text("""
        SELECT id, tier FROM member WHERE boj_id = :userid
    """), {'userid': userid}).fetchall()
    id_tier = [{
        'user_id': i['id'],
        'tier': i['tier'],
    } for i in id_tier]
    user_id = id_tier[0]['user_id']
    tier = id_tier[0]['tier']
    tiers = [tier-1, tier, tier+1]
    
    # 유저의 solving log 불러오기
    collection = mongodb.solving_log
    solving_log = collection.find({'member_id': user_id }, {'_id':0, 'problem_id':1})
    solved_id_list = [s['problem_id'] for s in list(solving_log)]


    #############
    # 문제 추천 #
    #############

    # 문제-태그 정보(problem_tag) 불러오기
    # 아직 안풀었고 내 티어 +-1 난이도 하나 랜덤 추출
    collection = mongodb.problem_tag_nest
    problem = collection.aggregate([
        {'$match': {'problem_id': { '$nin': solved_id_list}}},
        {'$match': {'level': {'$in': tiers}}},
        {'$sample': {'size': 10}},
        ])

    # json으로 형태변환
    problem = list(problem)
    problem = dumps(problem)
    
    return problem