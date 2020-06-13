// USER
// const SIGNUP = "/login/signup";
// const SIGNIN = "/login/signin";

// const USERS = "/users";
// const USER_DETAIL = "/:id";
// const CHANGE_PASSWORD = "/change-password";

//EXERCISE DATA
// import { exerciseDelete } from "./Controllers/dbControllers";

//DATABASE
const DATABASE = "/database";
const DATABASE_CREATE = "/database/create";
const DATABASE_DELETE = "/database/delete";

// USER
const USER_GET = "/user/get";
const USER_CREATE = "/user/create";

//CALENDAR
const CALENDAR_CREATE = "/calendar/create";
const CALENDAR_CREATE2 = "/calendar/create2";
const CALENDAR_INQUIRY = "calendar/inquiry";
const CALENDAR_GET = "/calendar/get";
const EXERCISE_CREATE = "calendar/exercise/create";
const EXERCISE_DELETE = "calendar/exercise/delete";

//EXERCISE
const EXERCISE_START = "/exercise/start";
const EXERCISE_RECORD = "/exercise/record";
const EXERCISE_GET = "/exercise/get";
const EXERCISE_SET = "/exercise/set";
const EXERCISE_DONE = "/exercise/done";
const USER_EXERCISE_RESET = "user/exercise/reset";

//CHART
const CHART_GET = "user/exercise/reset";

const routes = {
	// signup: SIGNUP,
	// signin: SIGNIN,
	// users: USERS,
	// userDetail: id => {
	//   if (id) {
	//     return `/users/${id}`;
	//   } else {
	//     return USER_DETAIL;
	//   }
	// },
	// changePassword: CHANGE_PASSWORD,
	userGet: USER_GET,
	userCreate: USER_CREATE, // test

	calendarCreate: CALENDAR_CREATE,
	calendarCreate2: CALENDAR_CREATE2,

	calendarInquiry: CALENDAR_INQUIRY,
	calendarGet: CALENDAR_GET,

	exerciseCreate: EXERCISE_CREATE,
	exerciseDelete: EXERCISE_DELETE,
	exerciseStart: EXERCISE_START,
	exerciseRecord: EXERCISE_RECORD,
	exerciseGet: EXERCISE_GET,
	exerciseSet: EXERCISE_SET,
	exerciseDone: EXERCISE_DONE,
	userExerciseReset: USER_EXERCISE_RESET,
	chartGet: CHART_GET,

	db: DATABASE,
	dbCreate: DATABASE_CREATE,
	dbDelete: DATABASE_DELETE,
};

export default routes;
