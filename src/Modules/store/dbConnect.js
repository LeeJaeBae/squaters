import { handleActions, createAction } from "redux-actions";
// createAction
import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "api/api";

// action types
const GET_DB = "dbConnect/GET_DB";
const GET_USER = "dbConnect/GET_USER";
const GET_CALENDAR = "dbConnect/GET_CALENDAR";

// action creators
export const getDb = createAction(GET_DB, api.getDb);
export const getUser = createAction(GET_USER, api.getUser);
export const getCalendar = createAction(GET_CALENDAR, api.getCalendar);

// initial state
const initialState = Map({
	test: "",
	user_id: 0,
	user_name: "",
	isDbOn: false,
	calendar: { level: "", calendarData: [], lastDate: "" },
});

export default handleActions(
	{
		...pender({
			type: GET_DB,
			onSuccess: (state, action) => {
				const {
					data: { data },
				} = action.payload;
				console.log(data);
				return state.set("user_id", data[0].user_id).set("user_name", data[0].user_name);
			},
			onFailure: (state, action) => {
				return state.set("test", "hi");
			},
		}),
		...pender({
			type: GET_USER,
			onSuccess: (state, action) => {
				const {
					data: { data },
				} = action.payload;
				if (data.user_id !== undefined) {
					return state.set("user_id", data.user_id).set("isDbOn", true);
				} else {
					return;
				}
			},
		}),
		...pender({
			type: GET_CALENDAR,
			onSuccess: (state, action) => {
				const {
					data: { level, calendarData, lastDate },
				} = action.payload;
				if (level === "undefined") {
					return state.set("calendar", { level: level });
				} else if (level === 0) {
					return state.set("calendar", {
						level: level,
						calendarData: calendarData,
						lastDate: lastDate,
					});
				} else {
					return state.set("calendar", { level: level });
				}
			},
		}),
	},
	initialState
);
