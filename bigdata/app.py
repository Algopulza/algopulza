import json
from json import JSONEncoder
from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text
from recomm import vulnerability, user_vulnerability, save_data

# Default JSON encoder는 set를 JSON으로 변환 불가
# set을 list로 변환 후 JSON으로 변환할 수 있도록 커스텀 엔코더 작성
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)

        return JSONEncoder.default(self, obj)


def create_app(test_config = None):
    # create_app 함수 자동으로 factory 함수로 인식, flask 실행
	# test_config: 단위 테스트 실행시 테스트용 db 등 테스트 설정정보 적용하기 위함
    app = Flask(__name__)
    CORS(app)
    app.config['JSON_AS_ASCII'] = False
    app.json_encoder = CustomJSONEncoder


	# test_config가 None인 경우 config.py에서 설정 가져옴
    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)

    
    # create_engine 함수 사용해 db 연결
    database = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
	# engine 객체를 flask 객체에 저장, create_app 함수 외부에서도 db 사용할 수 있도록 설정
    app.mysql_db = database

    client = MongoClient('localhost', 27027)
    # client = MongoClient('localhost', 27017)
    mongodb = client.algopulza_test
    

    @app.route('/')
    def hello():
        return f'<p> hello </p>'

    # sql data fetch test
    @app.route("/test")
    def sql_test():
        tmp = app.mysql_db.execute(text("""
            SELECT * FROM problem WHERE id <= 320
        """)).fetchall()

        tmp2 = [{
            'id': t['id'],
            'name': t['title'],
        } for t in tmp]
        tmp2 = jsonify(tmp2)

        return tmp2

    # 전체 문제 갱신 후 저장
    @app.route("/save-data")
    def save_dat():
        problem_tag_data = save_data.save_data(app, mongodb)
        return '<p>data saved</p>'

    # 유저 취약태그 분석
    @app.route('/<userid>/vulnerability')
    def user_vul(userid):
        res = user_vulnerability.user_vulnerability(app, mongodb, userid)
        return res

    # 유저 취약태그 문제 추천
    @app.route('/<userid>/recomm/vulnerability')
    def recomm_vul(userid):
        res = vulnerability.recomm_vulnerability(app, mongodb, userid)
        return res

    return app


if __name__ == '__main__':
    # python app.py 혹은 flask run으로 실행
    ## flask run의 경우 개발자모드 비활성화
    app = create_app()
    app.debug = True # 개발자 모드
    app.run()