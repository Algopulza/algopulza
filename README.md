# 💡 알고리즘 문제 추천 및 취약점 분석 서비스 ALGOPULZA 💡

> 1일 1알고리즘을 하는데 매일 무슨 문제를 풀지 모르겠는 A양 <br>
> 부족한 알고리즘 역량이 무엇인지 궁금한 B군 <br>
> 실력에 맞는 문제를 풀고싶은 C양 <br>
> <br>
>  <br>
> Algopulza를 통해 내 실력에 맞는 문제를 추천받고 <br>
> 내 실력을 분석해보아요~! <br>
> <br>
> 막 풀지 말고 ❌  알고 풀자❗️<br>

---

## 📎   프로젝트 목차

---

- [💡 알고리즘 문제 추천 및 취약점 분석 서비스 ALGOPULZA 💡](#💡-알고리즘-문제-추천-및-취약점-분석-서비스-ALGOPULZA-💡)
- [1️⃣ 프로젝트 소개](#1️⃣-프로젝트-소개)
- [2️⃣ 기술 스택](#2️⃣-기술-스택)
- [3️⃣ 파일 구조](#3️⃣-파일-구조)
- [4️⃣ 산출물](#4️⃣-산출물)
- [5️⃣ 프로젝트 빌드](#5️⃣-프로젝트-빌드)

---

### 1️⃣ 프로젝트 소개

📆  일정 : 22.04.11 - 22.05.20 (총 6주)

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

👨‍👨‍👦‍  <b>인원 (총 5인)</b>

🧑 박상현 : 팀장, Frontend

🧑 강동원 : Frontend, Data Analysis

🧑 장준범 : Frontend

👩 김혜지 : Backend, Server

👩 이민정 : Backend 

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

🎨  <b>컨셉</b> : 차분한 느낌을 주는 흑색계열의 색을 메인컬러로 사용 / 눈에 띄는 노란색을 포인트컬러로 사용

- 메인컬러1 : #FDC33E (로고, 버튼, 글씨색 등)

- 메인컬러2: #282828 (버튼, 배너, nav바 등)

- 컬러1 : #FFFFFF (배경, 글씨 색 등)

- 컬러2 : #AD5600, #435F7A, #EC9A00, #27E2A4, #00B4FC, #FF0062, #444444  (카드 배경)

- 컬러3 : #FFC94D, #FFFFFF, #F4F4F4, #FFCF62 (분석 버튼)

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

‼️  <b>기획 배경</b> 

- 알고리즘 문제 뭐 풀지 고민하는데 소요되는 시간 아까움

- 실력에 맞는 문제를 풀고 싶음

- 현재 내 알고리즘 실력을 분석받고 싶음

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

⚙️  <b>주 기능</b>

- 백준 사이트 알고리즘 문제 리스트 + 검색 기능

- 많이 푼 주요유형 문제 추천

- 적게 푼 주요유형 문제 추천

- 풀었던 문제 랜덤 추천

- 유사티어유저가 푼 문제유형 추천

- 실력에 맞는 문제 랜덤 추천

- 전체 문제 중 랜덤 추천

- 태그별 문제 랜덤 추천

- 취약점 및 태그별 해결 문제 그래프로 시각화

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

🧐  <b>추천 알고리즘</b> 

- 많이 푼 주요유형 문제 추천
    1. 8개 문제 유형을 주요 유형으로 지정
    2. 문제유형 선택
        - 8개 주요유형 중 유저가 많이 푼 유형 4개 선택
    3. 해결여부 필터링
        - 해당 유형 문제 중 이미 해결한 문제 제외
    4. 난이도 필터링
        - 해결한 문제들의 평균 난이도 계산
        - 해당 난이도와 비슷한 난이도를 가진 문제 필터링
    5. 문제추천
        - 필터링된 문제 중 랜덤으로 5개 추천
<br/>

- 적게 푼 주요유형 문제 추천
    1. 8개 문제 유형을 주요 유형으로 지정
    2. 문제유형 선택
        - 8개 주요유형 중 유저가 적게 푼 유형 4개 선택
    3. 해결여부 필터링
        - 해당 유형 문제 중 이미 해결한 문제 제외
    4. 난이도 필터링
        - 해결한 문제들의 평균 난이도 계산
        - 해당 난이도와 비슷한 난이도를 가진 문제 필터링
    5. 문제추천
        - 필터링된 문제 중 랜덤으로 5개 추천
<br/>

- 풀었던 문제 랜덤 추천
    - 유저가 해결한 문제 조회
    - 문제 추천
        - 조회된 문제 중 랜덤으로 5개 추천
<br/>

- 유사티어유저가 푼 문제유형 추천
    - 협업 필터링 기반 추천
    1. 하루 한번 티어별 모델 생성 후 추천 데이터 MongoDB 저장
        - 해당 티어 내 유저가 2명인 이하인 경우 제외
        - 해당 티어 내 풀이기록에 1명의 유저 기록밖에 없는 경우 제외
        - 풀이기록이 10개 미만인 유저 제외
    2. 문제추천
        - 유저 티어에 해당하는 모델에서 추천 정보 획득
        - 랜덤으로 5개 추천

---

### 2️⃣  기술 스택
<b>Communication</b> <br/>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=JiraSoftware&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<b>Frontend</b> <br/>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<b>Backend</b> <br/>
<img src="https://img.shields.io/badge/IntelliJ-000000?style=for-the-badge&logo=IntelliJ&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<b>BigData</b> <br/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=NumPy&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/scikit-learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/SciPy-8CAAE6?style=for-the-badge&logo=SciPy&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>

<b>CICD</b> <br/>
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/>
<br/>
<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

|     구분     |      기술스택     |     버전   |
|--------------| ------------------|------------|
| 이슈관리      | Jira              | \-         |
| 형상관리      | Gitlab            | \-         |
| 커뮤니케이션  | Mattermost        | \-         |
|              | Gathertown        | \-         |
|              | Notion            | \-         |
|              | Figma             | \-         |
| OS           | Window10          | \-         |
|              | Mac               | \-         |
| IDE          | IntelliJ          | \-         |
|              | Visual Studio Code| 1.67.1     |
| Frontend     | HTML5             | \-         |
|              | CSS3              | \-         |
|              | TypeScript        | 4.6.3      |
|              | Next.js           | 12.1.5     |
|              | React             | 18.0.8     |
|              | Recoil            | 0.7.2      |
|              | styled-components | 5.3.5      |
|              | apexcharts        | 3.35.0     |
|              | slick-carousel    | 1.8.1      |
|              | mui/material      | 5.6.3      |
| Backend      | Java              | 11         |
|              | SpringBoot        | 2.6.x      |
|              | Swagger           | 3.x.x      |
|              | QueryDsl-JPA      | 5.x.x      |
|              | JWT               | 0.9.       |
|              | Lombok            | \-         |
|              | Security          | 2.5.5      |
|              | Validation        | 2.6.2      |
|              | AWS               | 2.2.6      |
|              | Gradle            | 7.4.2      |
| BigData      | Python            | 3.9.6      |
|              | Flask             | 2.1.1      |
|              | Numpy             | 1.22.3     |
|              | Pandas            | 1.4.2      |
|              | Scikit-learn      | 1.0.2      |
|              | Scipy             | 1.8.0      |
|              | Sklearn           | 0.0        |
| Database     | MySQL Workbench   | 8.0.x      |
|              | Mongo DB          | \-         |
|              | AWS S3            | \-         |
|              | AWS RDS           | \-         |
| CI/CD        | AWS EC2           | \-         |
|              | Jenkins           | \-         |
|              | Docker            | \-         |
|              | Ngnix             | \-         |

</details>

---

### 3️⃣  파일 구조

- [파일 구조](https://2dend.notion.site/AlgoPulza-ec55f81336584d8a95cba93d540c8c9f)

---

### 4️⃣  산출물

- 프로젝트 관리 : [Notion](https://2dend.notion.site/b02854c5d8d04c6eaeac11b767be14a3)

- [기획서(중간발표)](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/%EA%B8%B0%ED%9A%8D%EC%84%9C(%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C)/algopulza_%E1%84%8C%E1%85%AE%E1%86%BC%E1%84%80%E1%85%A1%E1%86%AB%E1%84%87%E1%85%A1%E1%86%AF%E1%84%91%E1%85%AD.pdf)

- [와이어프레임(figma)](https://www.figma.com/file/dKmIaVcWei43K9BTvlIFg6/SSAFY_3rd_%EC%95%8C%EA%B3%A0%ED%92%80%EC%9E%90?node-id=0%3A1)

- [ERD](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/DB_dump/algopulza_erd.png)
- [시스템 아키텍처](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90/system_architecture.png)
- [화면 정의서](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/%ED%99%94%EB%A9%B4%EC%A0%95%EC%9D%98%EC%84%9C/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%A5PDF.pdf)

- [최종 발표물](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C/%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%80%E1%85%A9%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8C%E1%85%A1_%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%87%E1%85%A1%E1%86%AF%E1%84%91%E1%85%ADPDF.pdf)

- [UCC](https://www.youtube.com/watch?v=pg8k7BAyT4M)

---

### 5️⃣  프로젝트 빌드

- [포팅 메뉴얼](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/%ED%8F%AC%ED%8C%85%EB%A9%94%EB%89%B4%EC%96%BC/%ED%8F%AC%ED%8C%85_%EB%A9%94%EB%89%B4%EC%96%BC.pdf)

- [시연 시나리오](https://lab.ssafy.com/s06-final/S06P31A408/-/blob/develop/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/%E1%84%89%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%89%E1%85%B5%E1%84%82%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9PDF.pdf)
