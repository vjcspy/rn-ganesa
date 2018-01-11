import {Action} from "redux";

export const ACTION_APP_DID_MOUNT = "ACTION_APP_DID_MOUNT";

export const actionAppDidMount = () => ({
    type: ACTION_APP_DID_MOUNT,
    payload: {}
});


export class AppActions {
    static ACTION_APP_DID_MOUNT = "ACTION_APP_DID_MOUNT";
    
    constructor(protected store$: any) {}
    
    appDidMount(dispatch: boolean = true): Action {
        const action = {type: AppActions.ACTION_APP_DID_MOUNT, payload: {}};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
}
