import { handleActions, createAction } from "redux-actions";
// createAction
import { Map } from "immutable";
// import { pender } from "redux-pender";
// import * as api from "api/api";

// action types
// const IS_LOGIN = "login/IS_LOGIN";
// const TOGGLE = "login/TOGGLE";
const LOGIN = "login/LOGIN";

const TEST = "login/TEST";

// action creators
// export const isLogin = createAction(IS_LOGIN);
// export const toggle = createAction(TOGGLE);
export const login = createAction(LOGIN);
export const test = createAction(TEST, () => {
	return { test: "test" };
});

// initial state
const initialState = Map({
	loginValue: true,
	id: 1,
});

// reducer
export default handleActions(
	{
		[LOGIN]: (state, action) => {
			const id = state.get("id");
			const password = state.get("password");
			const { getId, getPassword } = action.payload;
			if (id === getId && password === getPassword) {
				return state.set("loginValue", true);
			} else {
				return state.set("loginValue", false);
			}
		},
		[TEST]: (state, action) => {
			const a = action.payload;
			state.set("id", a);
		},
	},
	initialState
);
