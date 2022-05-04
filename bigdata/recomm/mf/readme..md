# 유사티어 유저 추천 알고리즘 - sgd mf
유저와 티어가 비슷한 유저들이 많이 시도하거나 푼 문제를 추천하는 알고리즘입니다. 정기적으로 모델을 생성해 해당 모델에서 산출한 결괏값(예상 추천 점수)를 mongoDB에 저장합니다. 그 후 저장해둔 데이터를 필요에 따라 적절히 전달해 표시합니다. 구현 URL은 다음과 같습니다.

## /save-mf-models
- mf 모델을 생성, 결괏값 산출 후 mongoDB 저장
- 함수 구조
  - save_mf_model : app.py에서 실행되는 함수
    - train.train_level : 각 티어별 모델 생성, 데이터 fetch 및 전처리
      - model.train_mf : 모델 학습
        - model.MF : Maxtrix Factorization 관련 class 및 함수
- 데이터 저장 형태
```
{
  {
    tier: int
    data: [
      {
        member_id: int,
        problem_id: int,
        predicted_r: float,
      }, ...
    ]
  }, ...
}
```