// USER
// const SIGNUP = "/login/signup";
// const SIGNIN = "/login/signin";

// const USERS = "/users";
// const USER_DETAIL = "/:id";
// const CHANGE_PASSWORD = "/change-password";

// EXERCISE DATA
const EXERCISE = "/exercise";
const EXERCISE_GET = "/exercise/get";
const EXERCISE_DONE = "/exercise/done";

//DATABASE
const DATABASE = "/database";
const DATABASE_CREATE = "/database/create";
const DATABASE_DELETE = "/database/delete";

//CALENDAR
const CALENDAR = "/calendar";

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
  exercise: EXERCISE,
  exerciseDone: EXERCISE_DONE,
  exerciseGet: EXERCISE_GET,
  db: DATABASE,
  dbCreate: DATABASE_CREATE,
  dbDelete: DATABASE_DELETE,
  calendar: CALENDAR
};

export default routes;
