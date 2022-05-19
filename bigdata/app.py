from json import JSONEncoder
from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text
from recomm import vulnerability, user_vulnerability, freq_tag, user_freq_tag, save_data, random, random_level
from recomm.mf import train, recomm_mf
from algo import analysis, recomm


# set을 list로 변환 후 JSON으로 변환할 수 있도록 커스텀 엔코더 작성
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return JSONEncoder.default(self, obj)


def create_app(test_config=None):
    
    #################
    # flask setting #
    #################
    
    # create_app 함수 자동으로 factory 함수로 인식, flask 실행
	# test_config: 단위 테스트 실행시 테스트용 db 등 테스트 설정정보 적용하기 위함
    # json_encoder: jsonify() 통해 응답 보낼 경우 지정한 인코더 통해 생성하도록 설정
    app = Flask(__name__)
    CORS(app)
    app.config['JSON_AS_ASCII'] = False
    app.json_encoder = CustomJSONEncoder

	# test_config가 None인 경우 config.py에서 설정 가져옴
    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)


    ##########
    # DB 연결 #
    ##########

    # MySQL
    ## create_engine 함수 사용해 DB 연결
    database = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
	## engine 객체를 flask 객체에 저장, create_app 함수 외부에서도 db 사용할 수 있도록 설정
    app.mysql_db = database

    # MongoDB
    client = MongoClient('k6a4081.p.ssafy.io', 27017, username=app.config['MONGO_USER'] , password=app.config['MONGO_PW'])
    # client = MongoClient('localhost', 27027)
    mongodb = client.algopulza_test
    

    #############
    # flask URL #
    #############

    @app.route('/')
    def hello():
        return '<p> hello </p>'
    
    #### 데이터 저장 ####

    # 전체 문제데이터 변형 후 저장
    @app.route("/save-data")
    def save_dat():
        res_problem_tag_data = save_data.save_data(app, mongodb)
        # res_mf_data = save_mf_model()
        return '<p>data saved</p>'

    # 유사티어 유저 mf 모델 저장
    @app.route("/save-mf-model")
    def save_mf_model():
        res = train.train_level(app, mongodb)
        return '<p>model saved</p>'
    


    #### 분석 ####

    # 많이 푼 문제 유형
    @app.route('/freq-tag/<userid>')
    def user_freq(userid):
        """
        분석: 유저가 많이 푼 태그와 태그별 해결비율 반환
        """
        res = user_freq_tag.user_freq_tag(app, mongodb, userid)
        return res

    # 주요 문제유형 분석(핵심 태그 분석)
    @app.route('/vulnerability/<userid>')
    def core_tag(userid):
        """
        분석:
            6개 핵심 태그 분석
            (태그별 해결한 문제수) / (태그별 전체 문제수)
        """
        res = analysis.core_tag(app, mongodb, userid)
        return res

    # @app.route('/vulnerability/<userid>')
    # def user_vul(userid):
    #     """
    #     분석:
    #          유저가 적게 푼 태그와 태그별 취약점수 반환
    #         * 취약점수 = (실패비율) * (태그별 가중치)
    #             * 실패비율 = (태그별 tried 수) / (태그별 전체 제출 횟수)
    #             * 태그별 가중치 = (태그별 문제 수) / (전체 문제 수)
    #     """
    #     res = user_vulnerability.user_vulnerability(app, mongodb, userid)
    #     return res


    #### 문제 추천 ####


    # 많이 푼 유형 문제 추천
    @app.route('/recomm/freq-tag/<userid>')
    def recomm_freq(userid):
        """
        추천:
            유저가 푼 주요 8개 태그 중 많이 푼 태그 4개 선택
            해당 태그 중 안 푼 문제 추천
        주요문제유형 하나라도 풀면 추천 가능
        """
        res = freq_tag.recomm_freq_tag(app, mongodb, userid)
        if res == 'empty':
            print('empty mf recomm problems list')
            return ''
        return res

    # 적게 푼 유형 문제 추천
    @app.route('/recomm/vulnerability/<userid>')
    def recomm_vul(userid):
        """
        추천:
            유저가 푼 주요 8개 태그 중 적게 푼 태그 4개 선택
            해당 태그 중 안 푼 문제 추천
        주요문제유형 하나라도 풀면 추천 가능
        """
        res = vulnerability.recomm_vulnerability(app, mongodb, userid)
        if res == 'empty':
            print('empty vulnerable recomm problems list')
            return ''
        return res

    # 풀었던 문제 무작위 추천
    @app.route('/random-solved/<userid>')
    def rand_solved(userid):
        """
        추천: 이미 푼 문제 10개 랜덤추천
        한문제라도 풀면 추천 가능
        """
        res = random.recomm_random_solved(app, mongodb, userid)
        if res == 'empty':
            print('empty solved problems list')
            return ''
        return res

    # 유사티어 유저 문제 추천
    @app.route("/recomm/mf-model/<userid>")
    def recomm_mf_model(userid):
        res = recomm_mf.recomm_mf(app, mongodb, userid)
        if res == 'empty':
            print('empty mf recomm problems list')
            return ''
        return res


    #### 기타 랜덤 ####


    # 자신 티어 +-1 level 문제 1개 랜덤추천
    @app.route('/random-level/<userid>')
    def rand_lv(userid):
        res = random_level.random_one(app, mongodb, userid)
        if res == 'empty':
            print('empty solving log')
            return ''
        return res

    # 아직 안 푼 자신 티어 +-1 level 문제 10개 랜덤추천
    @app.route('/random/<userid>')
    def rand(userid):
        rand_problem = random.recomm_random(app, mongodb, userid)
        return rand_problem

    return app


if __name__ == '__main__':
    # python app.py 혹은 flask run으로 실행
    ## flask run의 경우 개발자모드 비활성화
    app = create_app()
    app.debug = True # 개발자 모드
    app.run(host='0.0.0.0')