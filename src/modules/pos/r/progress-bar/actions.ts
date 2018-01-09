import {Action} from "redux";

export const ACTION_UPDATE_PROGRESS_BAR = "ACTION_UPDATE_PROGRESS_BAR";

export const actionUpdateProgressBar = (value) => ({
    type: ACTION_UPDATE_PROGRESS_BAR,
    payload: {value}
});

export const ACTION_RESET_PROGRESS_BAR = "ACTION_RESET_PROGRESS_BAR";

export const actionResetProgressBar = () => ({
    type: ACTION_RESET_PROGRESS_BAR,
    payload: {}
});

export class ProgressActions {
    static ACTION_UPDATE_PROGRESS_BAR = "ACTION_UPDATE_PROGRESS_BAR";
    static ACTION_RESET_PROGRESS_BAR  = "ACTION_RESET_PROGRESS_BAR";
    
    constructor(public store$: any) {
    
    }
    
    updateProgressBar(value, dispatch: boolean = true): Action {
        const action = {type: ACTION_UPDATE_PROGRESS_BAR, payload: {value}};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
    
    resetProgressBar(dispatch: boolean = true): Action {
        const action = {type: ACTION_RESET_PROGRESS_BAR, payload: {}};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
}
