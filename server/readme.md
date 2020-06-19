---
@메인 메뉴에서 운동시작 버튼을 누르면

calendarInquiry을 실행하여 캘린더 생성여부를 확인하고
운동 목록 페이지 이동(캘린더 운동, 사용자 지정 운동, 운동 레벨 1 ~)

1. 생성이 안되어 있으면(undefined) 반환
-> 최상위 메뉴에 캘린더 생성 버튼 출력
-> 생성 버튼을 누루면 초급(1), 중급(2), 고급(3), 사용자 지정 레벨(~) 선택
-> calendarCreate에 level=? 값을 주어서 캘린더 날짜, 운동 생성

2-1. 생성이 되어 있으면 0을 반환
-> 최상위 메뉴에 캘린더 운동 시작 버튼 출력

2-2. 이미 생성했었던 캘린더가 30일이 지나면 다음레벨을 반환
-> calendarCreate에 level=? 값에 다음레벨을 주어서 날짜, 운동 생성
---

@메인 메뉴에서 캘린더보기 버튼을 누르면

calendarInquiry을 실행하여 캘린더 생성여부를 확인,
2-1. 생성이 되어 있어서 0을 반환하는 경우, 캘린더의 정보 반환
{id: 날짜, check : 완료여부, today : 오늘날짜(1~30)}

---

@캘린더보기를 눌러서 캘린더 페이지가 보일때
위의 캘린더 정보를 토대로 캘린더 화면 출력

날짜가 있는 날을 선택하면 calendarGet에 calendarId=?(1~30) 값을 주어서 해당 날짜의 생성된 운동 정보를 반환

운동을 생성하려면 exerciseCreate에 calendarId=?(1~30), exerciseData=?(운동횟수) // 맨 아래에 하나씩 생성

운동 삭제는 exerciseDelete에 calendarId=?(1~30), exerciseNo=?(생성된 운동 순서/휴식을 제외한 무조건 운동의 순서) // 휴식 순서 입력시 false반환
운동/휴식 수정은 exerciseUpdate에 calendarId=?(1~30), exerciseData=?(수정값), exerciseNo=?(생성된 운동/휴식 순서)

날짜가 없는 날에 운동을 생성하려면 calendarCreate2에 calendarId=?(날짜1~30) 그리고 exerciseCreate로 운동 생성

---

@사용자 지정 운동

사용자 지정 운동은 calendarGet에 calendarId=?를 0으로 주면 받아 올 수 있음
운동 생성(exerciseCreate), 삭제(exerciseDelete), 수정(exerciseUpdate) 역시 calendarId=?에 0을 주면 됨

---

@운동 시작

exerciseStart에 type=? (캘린더운동-true, 사용자 생성 운동-false) // 운동 시작 전에 테이블 초기화 작업
exerciseStart실행 후 exerciseGet를 불러와서 당장 해야할 세트의 횟수를 받아옴

스쿼트 1회 완수 할때마다 exerc iseRecord를 실행하여 값을 저장
한세트가 끝나면 exerciseSet를 불러와서 세트값 저장 다시 exerciseGet을 실행하여 다음 세트 횟수를 얻어옴
exerciseGet의 반환값이 undefined 이면 남은 세트가 없는 것임

모든 운동이 끝나면 exerciseDone에 reps=?에 값을 주어 총 횟수를 chart에 저장함 (1회 완수할때마다 별도의 변수로 횟수를 계속 저장하고 있어야함)
그리고 마지막으로 userExerciseReset를 실행하여 테이블 초기화

---

@차트 정보

chartGet
// limit=? - 날짜 단위(ex 7(일주일), 30(30일))
// index=? - 1, 2, 3, 4, 5 ~ ~ (페이지)
