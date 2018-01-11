import {injectable} from "inversify";
import {Store} from "../../../framework/redux/observable/store";
import {Action} from "redux";

@injectable()
export class RoutesActions {
    
    static ACTION_NAVIGATE = 'Navigation/NAVIGATE';
    static ACTION_RESET    = 'Navigation/RESET';
    static ACTION_BACK     = 'Navigation/BACK';
    
    constructor(protected store$: Store<any>) {}
    
    navigate(routeName, params?: any, subaction?: any, dispatch: boolean = true): Action {
        const action = {type: RoutesActions.ACTION_NAVIGATE, routeName, params, action: subaction};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
    
    reset(index, key?: any, subaction?: any, dispatch: boolean = true): Action {
        const action = {type: RoutesActions.ACTION_RESET, index, key, action: subaction};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
    
    back(key?: any, dispatch: boolean = true): Action {
        const action = {type: RoutesActions.ACTION_BACK, key};
        
        if (dispatch === true) {
            this.store$.dispatch(action);
        }
        
        return action;
    }
}
