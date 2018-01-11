import {Observable} from "rxjs/Observable";
import store from "../store";

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

let storeStream       = getState$(store).share();
storeStream["select"] = (key: string) => {
    return storeStream.map((state) => state[key]).distinctUntilChanged();
};


export const store$ = storeStream;
