import {injectable} from "inversify";
import {Action} from "redux";
import {Store} from "../../../../../framework/redux-observable/store";

@injectable()
export class CoreActions {
    static ACTION_APP_DID_MOUNT = "ACTION_APP_DID_MOUNT";

    constructor(protected store$: Store<any>) {
    }

    appDidMount(dispatch: boolean = true): Action {
        const action = {type: CoreActions.ACTION_APP_DID_MOUNT, payload: {}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }
}