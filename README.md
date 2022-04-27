## 🌱 TIL: Next.js

> 작성자: 박상현

<br>

```
💡 처음 만난 Next.js.. 고통받은 나날들의 기록
```

<br>

#### 001. 프로젝트 생성

<br>

```bash
$ npx create-next-app@latest --typescript
```

<br>

타입스크립트 기반 Next.js 프로젝트 생성 명령어를 치면 프로젝트명이 무엇이냐고 물어본다. 프로젝트명을 입력하고 나서 잠시 기다리면 Next.js 프로젝트 생성이 완료된다.

<br>

##### 001.1. development server 실행

```bash
$ npm run dev
```

<br>

bash 창에 `http://localhost:3000`이 출력될 것이다. 해당 url에 접속하면 아래와 같은 초기 화면을 볼 수 있다.

<br>

![image-20220427231213679](README.assets/image-20220427231213679.png)

<br>

<br>

#### 002. Routing

<br>

Next.js는 별도의 라이브러리를 설치하지 않아도 파일 시스템에 기반한 자체 router를 제공한다. `pages` 디렉터리의 파일 구조에 따라 route가 형성되는 방식이다.

<br>

```
page/index.js 👉 '/'
page/home/index.js 👉 '/home'
page/analysis/class.js 👉 '/analysis/class'
```

<br>

<br>
