from sqlalchemy import create_engine, text

def save_data(app):
    data_problem = app.mysql_db.execute(text("""
        SELECT * FROM problem limit 0, 5
    """)).fetchall()
    data_tag = app.mysql_db.execute(text("""
        SELECT * FROM tag
    """)).fetchall()
    return data_problem