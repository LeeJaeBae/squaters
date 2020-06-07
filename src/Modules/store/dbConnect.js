import { handleActions, createAction } from "redux-actions";
// createAction
import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "api/api";

// action types
const POST_COUNTER = "dbConnect/POST_COUNTER";
const GET_COUNTER = "dbConnect/GET_COUNTER";

// action creators
export const postCounter = createAction(POST_COUNTER, api.postCounter);
export const getCounter = createAction(GET_COUNTER, api.getCounter);

// initial state
const initialState = Map({
    counter_id: "1",
    setNum: 0,
    amount: 0,
});

export default handleActions(
    {
        ...pender({
            type: GET_COUNTER,
            onSuccess: (state, action) => {
                const {
                    data: { data },
                } = action.payload;
                const data_ = fromJS(data);
                return state
                    .set("counter_id", data_.get("_id"))
                    .set("setNum", data_.get("setCount").get("setNum"))
                    .set("amount", data_.get("setCount").get("amount"));
            },
        }),
    },
    initialState
);
