import {injectable} from "inversify";
import {Actions} from "../../../../redux-observable/actions";

@injectable()
export class ProgressBarEffect {
    constructor(protected actions$: Actions) {
    }
}
