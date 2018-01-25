import {combineReducers} from "redux";

const appReducer = (state = {
    tick: 1
}, action) => {
    return state;
}

const appReducers = {
    app: appReducer
};

export function createReducer(asyncReducers = {}) {
    return combineReducers(Object.assign(appReducers, asyncReducers));
}
