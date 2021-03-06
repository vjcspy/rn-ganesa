import {applyMiddleware, createStore, compose} from "redux";
import middleware from "./middleware";
import {createReducer} from "./reducer";
import {effectMiddleware} from "./effects";

const enhancers = [
    applyMiddleware(...middleware),
    applyMiddleware(effectMiddleware)
];

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const composeEnhancers = (
                             __DEV__ &&
                             typeof (window) !== "undefined" &&
                             window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
                         ) || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

// create the store
export const store    = createStore(
    createReducer(),
    enhancer
);
// Replace module splice reducer
const reducerReplaced = {};

export function replaceModuleReducer(key, reducer) {
    if (reducerReplaced[key] !== true) {
        store.replaceReducer(reducer);
        reducerReplaced[key] = true;
    }
}
