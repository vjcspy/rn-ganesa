import {Effect} from "../../../../redux/observable/effect";
import {Subject} from "rxjs/Subject";

export class ProgressBarEffect {
    public action$ = new Subject<any>();
    
    constructor() {
    
    }
    
    @Effect() test = this.action$
                         .filter(action => action.type === "PING")
                         .do(() => console.log("EFFECT_PING"))
                         .delay(1000) // Asynchronously wait 1000ms then continue
                         .mapTo({type: "PONG"});
}
