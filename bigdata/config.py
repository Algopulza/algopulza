mysql_db = {
    'user'     : 'ssafy',
    'password' : 'dkfrhvnfwk123',
    'host'     : 'algopulza-test-db.cogsuiysl2rl.ap-northeast-2.rds.amazonaws.com',
    'port'     : 3306,
    'database' : 'test'
}

DB_URL = f"mysql+mysqlconnector://{mysql_db['user']}:{mysql_db['password']}@{mysql_db['host']}:{mysql_db['port']}/{mysql_db['database']}?charset=utf8"


mongodb = {
    'user'     : 'ssafy',
    'password' : 'dkfrhvnfwk123',
    'host'     : 'k6a4081.p.ssafy.io',
    'port'     : 27017,
    'collection' : 'algopulza_test'
}
MONGO_USER = 'ssafy'
MONGO_PW = 'dkfrhvnfwk123'