import NavigatorStateReducer from "../modules/navigator/NavigatorState";
import CounterStateReducer from "../modules/counter/CounterState";
import SessionStateReducer from "../modules/session/SessionState";
import {combineReducers} from "redux";
// ## Generator Reducer Imports

const appReducers = {
  // Counter sample app state. This can be removed in a live application
  counter       : CounterStateReducer,
  // Navigator states
  navigatorState: NavigatorStateReducer,
  session       : SessionStateReducer
};

export function createReducer(asyncReducers = {}) {
  return combineReducers(Object.assign(appReducers, asyncReducers));
}
