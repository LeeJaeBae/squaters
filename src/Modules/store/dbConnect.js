import { handleActions, createAction } from "redux-actions";
// createAction
import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "api/api";

// action types
const GET_DB = "dbConnect/GET_DB";
const GET_USER = "dbConnect/GET_USER";

// action creators
export const getDb = createAction(GET_DB, api.getDb);
export const getUser = createAction(GET_USER, api.getUser);

// initial state
const initialState = Map({
	test: "",
	user_id: 0,
	user_name: "",
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
				console.log(action.payload);
				if (data.user_id !== undefined) {
					return state.set("user_id", data.user_id);
				} else {
					return;
				}
			},
		}),
	},
	initialState
);
