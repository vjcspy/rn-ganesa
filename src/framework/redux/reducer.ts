import {combineReducers} from "redux";

const appReducers = {};

export function createReducer(asyncReducers = {}) {
    return combineReducers(<any>Object.assign({}, appReducers, asyncReducers));
}
