mysql_db = {
    'user'     : 'ssafy',
    'password' : 'dkfrhvnfwk123',
    'host'     : 'algopulza-test-db.cogsuiysl2rl.ap-northeast-2.rds.amazonaws.com',
    'port'     : 3306,
    'database' : 'algopulza'
}

DB_URL = f"mysql+mysqlconnector://{mysql_db['user']}:{mysql_db['password']}@{mysql_db['host']}:{mysql_db['port']}/{mysql_db['database']}?charset=utf8"


mongodb = {
    'user'     : 'algopulza',
    'password' : 'dkfrhvnfwk408',
    'host'     : 'algopulza.day',
    'port'     : 27017,
    'collection' : 'algopulza_test'
}
MONGO_USER = 'algopulza'
MONGO_PW = 'dkfrhvnfwk408'