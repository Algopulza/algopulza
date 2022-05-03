from sqlalchemy import text
import pandas as pd
import json

def save_data(app, mongodb):
    # 문제정보
    data_problem = app.mysql_db.execute(text("""
        SELECT * FROM problem
    """)).fetchall()
    
    problem = [{
        'level': p['level'],
        'problem_id': p['id'],
        'boj_id': p['boj_id'],
        'title': p['title'],
        'accepted_count': p['accepted_count'],
        'average_try_count': p['average_try_count'],
    } for p in data_problem]
    problem = json.dumps(problem, ensure_ascii=False)
    problem_df = pd.read_json(problem)


    # 문제-tag 정보
    data_problem_tag = app.mysql_db.execute(text("""
        SELECT * FROM problem_has_tag
    """)).fetchall()

    problem_tag = [{
        'problem_id': pt['problem_id'],
        'tag_id': pt['tag_id'],
    } for pt in data_problem_tag]
    problem_tag = json.dumps(problem_tag, ensure_ascii=False)
    problem_tag_df = pd.read_json(problem_tag)


    # tag 정보
    data_tag = app.mysql_db.execute(text("""
        SELECT * FROM tag
    """)).fetchall()

    tag = [{
        'tag_id': t['id'],
        'boj_tag_id': t['boj_tag_id'],
        'boj_key': t['boj_key'],
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
        'member_id': t['member_id'],
        'problem_id': t['problem_id'],
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
        tmp_df = merged_df1.loc[merged_df1['problem_id']==p['problem_id']]
        tmp_df = tmp_df[['problem_id', 'name']]
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