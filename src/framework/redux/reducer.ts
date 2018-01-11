import {combineReducers} from "redux";
import {NavigatorReducer} from "../native-base/navigator/NavigatorState";
// ## Generator Reducer Imports

const appReducers = {
    navigatorState: NavigatorReducer,
};

export function createReducer(asyncReducers = {}) {
    return combineReducers(Object.assign(appReducers, asyncReducers));
}
