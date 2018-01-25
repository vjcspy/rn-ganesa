import {Action} from "redux";
import {injectable} from "inversify";
import {app} from "../general/app";
import {Store} from "../redux-observable/store";

@injectable()
export class AppActions {
    static ACTION_APP_DID_MOUNT = "ACTION_APP_DID_MOUNT";
    
    constructor(protected store$: Store<any>) {}
    
    appDidMount(dispatch: boolean = true): Action {
        const action = {type: AppActions.ACTION_APP_DID_MOUNT, payload: {}};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
}

app().register(AppActions);
