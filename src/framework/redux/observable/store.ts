import {Observable} from "rxjs/Observable";
import store from "../store";
import {injectable} from "inversify";
import {app} from "../../general/app";
import "rxjs";

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

const storeStream = getState$(store).share();

@injectable()
export class Store<T> {
    select = (key: string) => storeStream.map((state) => state[key]).distinctUntilChanged();
    
    dispatch = (action) => store.dispatch(action);
}

app().register(Store);
