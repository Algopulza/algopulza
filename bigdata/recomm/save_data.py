from sqlalchemy import text
import pandas as pd
import json

def save_data(app):
    # 문제정보
    data_problem = app.mysql_db.execute(text("""
        SELECT * FROM problem
    """)).fetchall()
    
    problem = [{
        'level': p['level'],
        'problem_id': p['boj_id'],
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
        'tag_id': t['boj_tag_id'],
        'boj_key': t['boj_key'],
        'name': t['name'],
    } for t in data_tag]
    tag = json.dumps(tag, ensure_ascii=False)
    tag_df = pd.read_json(tag)


    merged_df = pd.merge(problem_tag_df, problem_df, how='left')
    merged_df = pd.merge(merged_df, tag_df, how='left')
    
    merged_json = merged_df.to_json(orient='records', force_ascii=False)
    return merged_json