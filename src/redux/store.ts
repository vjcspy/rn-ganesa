import {applyMiddleware, createStore, compose} from "redux";
import middleware from "./middleware";
import {createReducer} from "./reducer";
import {effectMiddleware} from "./effects";
import {Observable} from "rxjs/Observable";

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
const store = createStore(
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

export default store;


// Streaming Redux state as an Observable with RxJS

function getState$(store) {
    return new Observable(observer => {
        // emit the current state as first value:
        observer.next(store.getState());
        
        const unsubscribe = store.subscribe(() => {
            // emit on every new state changes
            observer.next(store.getState());
        });
        
        // let's return the function that will be called
        // when the Observable is unsubscribed
        return unsubscribe;
    });
}

export const store$ = getState$(store).share();
