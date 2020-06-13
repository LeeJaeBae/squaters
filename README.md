# 운동 앱 만들기 프로젝트

## APP NAME(미정)

---

## Routers

### 운동관련 라우터

> -   Home
>     > 기본적인 인터페이스 구현
> -   Login
>     > /home에 접근할 때 로그인이 안되있으면 자동 리디렉션
> -   Exercise
>     > 운동!

### 기타 작업

> -   Graph
>     > DB연동으로 자신의 운동량, 체중(bmi)등 그래프로 시각화
> -   Rank
>     > DB연동으로 사용자들의 랭킹
> -   Rewards
>     > 달성률 혹은 운동량으로 점수 지급, 테마 등 구매페이지

---

## 구현해야 할 것

> 1.  mysql db 연동
> 2.  스토어 리듀서들 정의
> 3.  디자인
> 4.  로고+앱이름

# 2020.06.13

---

1. dbControllers 정리 하다가 getUser, createUser 생성함
2. HomeContainer ComponentDidMount에 유저 조회 후 없으면 생성하게 만듬.
