import {injectable} from "inversify";
import {app} from "../general/app";
import {Subject} from "rxjs/Subject";
import "rxjs";
import * as _ from "lodash";
import {Error} from "../general/error";

@injectable()
class ActionsObservable {
    
    constructor() {
        const subject: any = new Subject();
        subject['ofType']  = (...keys: string[]): any => {
            return subject.filter((a) => _.indexOf(keys, a['type']) > -1).distinctUntilChanged()
        };
        
        return subject;
    }
}

export class Actions extends Subject<any> {
    ofType(...keys: string[]): any {
        throw new Error("must_not_go_here");
    };
}

app().bindTo(Actions, ActionsObservable);
