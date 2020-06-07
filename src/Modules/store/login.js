import { handleActions, createAction } from "redux-actions";
// createAction
import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "api/api";

// action types
// const IS_LOGIN = "login/IS_LOGIN";
// const TOGGLE = "login/TOGGLE";
const LOGIN = "login/LOGIN";
const SIGNUP = "login/SIGNUP";
const FINDID = "login/FINDID";

// action creators
// export const isLogin = createAction(IS_LOGIN);
// export const toggle = createAction(TOGGLE);
export const login = createAction(LOGIN);
export const findId = createAction(FINDID, api.getUsers);
export const signup = createAction(SIGNUP, api.postUser);

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
        ...pender({
            type: FINDID,
            onSuccess: (state, action) => {
                const {
                    data: { data },
                } = action.payload;
                const data_ = fromJS(data);
                return state
                    .set("id", data_.getIn([0, "id"]))
                    .set("password", data_.getIn([0, "password"]))
                    .set("username", data_.getIn([0, "name"]))
                    .set("question", data_.getIn([0, "question"]))
                    .set("answer", data_.getIn([0, "answer"]))
                    .set("_id", data_.getIn([0, "_id"]));
            },
            onFailure: (state, action) => {
                return;
            },
        }),
    },
    initialState
);
