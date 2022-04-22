# flask 가이드

## 서버 켜는 법

### 1. 패키지 설치

bigdata 디렉토리에서 아래 커맨드 입력

```bash
$ pip install virtualenv
$ virtualenv venv
$ source venv/Scripts/activate
$ pip install -r requirements.txt
```

### 2. 서버 run

venv 켜진상태에서 bigdata 디렉토리에서 아래 커맨드 입력

```bash
$ flask run
```

안될 경우

```bash
$ python app.py
```