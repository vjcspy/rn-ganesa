import {Effect} from "../../../../framework/redux-observable/effect";
import {Subject} from "rxjs/Subject";
import {injectable} from "inversify";
import {Actions} from "../../../../framework/redux-observable/actions";

@injectable()
export class ProgressBarEffect {
    constructor(protected actions$: Actions) {}
    
    @Effect() test = this.actions$
                         .filter(action => action.type === "PING")
                         .do(() => console.log("EFFECT_PING"))
                         .delay(1000) // Asynchronously wait 1000ms then continue
                         .mapTo({type: "PONG"});
}
