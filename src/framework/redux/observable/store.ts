import {Observable} from "rxjs/Observable";
import {injectable} from "inversify";
import {app} from "../../general/app";
import "rxjs";
import {store} from "../store";

@injectable()
export class Store<T> {
    static storeStream;
    
    select = (key: string) => {
        if (!Store.storeStream) {
            Store.storeStream = new Observable(observer => {
                // emit the current state as first value:
                observer.next(store.getState());
                
                const unsubscribe = store.subscribe(() => {
                    // emit on every new state changes
                    observer.next(store.getState());
                });
                
                // let's return the function that will be called
                // when the Observable is unsubscribed
                return unsubscribe;
            }).share();
        }
        return Store.storeStream.map((state) => state[key]).distinctUntilChanged();
    };
    
    dispatch = (action) => store.dispatch(action);
}

app().register(Store);
