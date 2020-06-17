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

" todos

1. 유저 생성시 동시에 캘린더 생성하게 유도 - 진행중
2. 운동시작이나 캘린더 조회시 캘린더에 운동이 들어있지 않으면 생성 유도

# 2020.06.14

---

### status

1. dbController 정리 진행중
    - exercise, home component 접근 시 db연동 구현 완료

### todos

    -   calendar, exercise set 조회 할 db 구현
    -   calendar에 날짜 필요할 것 같음
    -   chartJS, teachable react 연동

# 2020.06.15

---

### db 연동 진행상황

    - Home에서 유저 조회 ? 유지 : 유저생성
    - exercise에서 calendarInquriy ? Exercise : Selector
        - Selector : 레벨 클릭 시 캘린더 생성 설정 완료
                     Container에서 프로세스 정리해서 리로드해서 넘어가게 해야함

### 해야 할 일

    - 운동 카운트 될 때 db연결
    - teachable 확인
    - chartJS, calendar 조회, 결과 생성
    - calendar/id?id=n 형태로 운동 수정 혹은 결과 확인 페이지 생성
