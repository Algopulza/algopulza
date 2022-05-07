from sqlalchemy import text
import pandas as pd
import json

def get_tiername(lv):
    if lv == 0:
        return 'Unrated'
    elif lv == 31:
        return 'Master'
    elif (lv-1)//5 == 0:
        return 'Bronze'
    elif (lv-1)//5 == 1:
        return 'Silver'
    elif (lv-1)//5 == 2:
        return 'Gold'
    elif (lv-1)//5 == 3:
        return 'Platinum'
    elif (lv-1)//5 == 4:
        return 'Diamond'
    elif (lv-1)//5 == 5:
        return 'Ruby'


def save_data(app, mongodb):
    # 문제정보
    data_problem = app.mysql_db.execute(text("""
        SELECT * FROM problem
    """)).fetchall()
    
    problem = [{
        'level': p['level'],
        'tierLevel': 5-((p['level']-1)%5),
        'tierName': get_tiername(p['level']),
        'problemId': p['id'],
        'bojId': p['boj_id'],
        'title': p['title'],
        'acceptedCount': p['accepted_count'],
        'averageTryCount': round(p['average_try_count'], 1),
    } for p in data_problem]
    problem = json.dumps(problem, ensure_ascii=False)
    problem_df = pd.read_json(problem)


    # 문제-tag 정보
    data_problem_tag = app.mysql_db.execute(text("""
        SELECT * FROM problem_has_tag
    """)).fetchall()

    problem_tag = [{
        'problemId': pt['problem_id'],
        'tagId': pt['tag_id'],
    } for pt in data_problem_tag]
    problem_tag = json.dumps(problem_tag, ensure_ascii=False)
    problem_tag_df = pd.read_json(problem_tag)


    # tag 정보
    data_tag = app.mysql_db.execute(text("""
        SELECT * FROM tag
    """)).fetchall()

    tag = [{
        'tagId': t['id'],
        'bojTagId': t['boj_tag_id'],
        'bojKey': t['boj_key'],
        'name': t['name'],
    } for t in data_tag]
    tag = json.dumps(tag, ensure_ascii=False)
    tag_df = pd.read_json(tag)

    # solving log 정보
    data_solving_log = app.mysql_db.execute(text("""
        SELECT * FROM solving_log
    """)).fetchall()

    solving_log = [{
        'id': t['id'],
        'memberId': t['member_id'],
        'problemId': t['problem_id'],
        'status': t['status'],
    } for t in data_solving_log]


    # 문제-태그 정보 저장
    merged_df1 = pd.merge(problem_tag_df, tag_df, how='left')
    merged_df2 = pd.merge(problem_df, merged_df1, how='left')
    merged_json = merged_df2.to_json(orient='records', force_ascii=False)
    
    merged_json = json.loads(merged_json)
    collection = mongodb.problem_tag
    collection.delete_many({})
    collection.insert_many(merged_json)

    # nested 태그 문제 정보 저장
    problem_list = problem_df.to_dict('records')
    for p in problem_list:
        tmp_df = merged_df1.loc[merged_df1['problemId']==p['problemId']]
        tmp_df = tmp_df[['problemId', 'name']]
        tmp_list = tmp_df.to_dict('records')
        p['tags'] = tmp_list
    
    problem_tag_nest = json.dumps(problem_list, ensure_ascii=False)
    problem_tag_nest = json.loads(problem_tag_nest)
    collection = mongodb.problem_tag_nest
    collection.delete_many({})
    collection.insert_many(problem_tag_nest)
    
    # solving log 정보 저장
    solving_log_json = json.dumps(solving_log, ensure_ascii=False)
    solving_log_json = json.loads(solving_log_json)
    collection = mongodb.solving_log
    collection.delete_many({})
    collection.insert_many(solving_log_json)

    return 