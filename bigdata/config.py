mysql_db = {
    'user'     : 'ssafy',
    'password' : 'dkfrhvnfwk123',
    'host'     : 'algopulza-test-db.cogsuiysl2rl.ap-northeast-2.rds.amazonaws.com',
    'port'     : 3306,
    'database' : 'test'
}

DB_URL = f"mysql+mysqlconnector://{mysql_db['user']}:{mysql_db['password']}@{mysql_db['host']}:{mysql_db['port']}/{mysql_db['database']}?charset=utf8"