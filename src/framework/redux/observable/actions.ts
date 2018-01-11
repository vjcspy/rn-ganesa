import {Observable} from 'rxjs/Observable';
import {Action} from "redux";

export declare class Actions extends Observable<Action> {
    constructor(actionsSubject: Observable<Action>);
    
    ofType(...keys: string[]): Actions;
}
