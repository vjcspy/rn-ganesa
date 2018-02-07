import {injectable} from "inversify";
import {Actions} from "../../../../redux-observable/actions";
import {Effect} from "../../../../redux-observable/effect";
import {ProgressActions} from "./actions";

@injectable()
export class ProgressBarEffect {
    constructor(protected actions$: Actions, protected progressActions: ProgressActions) {
    }

    @Effect() whenDone = this.actions$
                             .ofType(ProgressActions.ACTION_DONE_PROGRESS_BAR)
                             .delay(1000)
                             .map(() => this.progressActions.resetProgressBar(false));
}
