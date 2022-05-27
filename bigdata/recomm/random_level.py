import pandas as pd
import json
from sqlalchemy import text
from bson.json_util import dumps

def random_one(app, mongodb, userid):
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
    tier = id_tier[0]['tier']
    tiers = [tier-1, tier, tier+1]
    
    # 유저의 solving 로그 불러오기
    solving_log = app.mysql_db.execute(text("""
        SELECT s.*
        FROM solving_log s
        JOIN (
            SELECT id, member_id
            FROM solving_log
            WHERE member_id = :user_id
        ) AS r ON s.id = r.id 
    """), {'user_id': id_tier[0]['user_id']}).fetchall()
    solving_log = [{
        'id': s['id'],
        'problemId': s['problem_id'],
        'status': s['status'],
    } for s in solving_log]
    solving_log = json.dumps(solving_log, ensure_ascii=False)
    solved_df = pd.read_json(solving_log)

    # 문제-태그 정보(problem_tag) 불러오기
    # 아직 안풀었고 내 티어 +-1 난이도 하나 랜덤 추출
    collection = mongodb.problem_tag_nest
    if len(solved_df) == 0:
        problem = collection.aggregate([
            {'$match': {'level': {'$in': tiers}}},
            {'$sample': {'size': 1}},
            ])
    else:
        problem = collection.aggregate([
            {'$match': {'problemId': { '$nin': solved_df['problemId'].tolist()}}},
            {'$match': {'level': {'$in': tiers}}},
            {'$sample': {'size': 1}},
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

    print(problem)
    problem = dumps(problem)
    
    return problem