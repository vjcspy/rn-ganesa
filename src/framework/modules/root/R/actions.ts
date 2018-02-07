import {Injectable} from "../../../general/app";
import {Store} from "../../../redux-observable/store";
import {Action} from "../../../redux-observable/typing";

@Injectable()
export class RootActions {
    static ACTION_NOTIFY_ERROR = 'ACTION_NOTIFY_ERROR';

    constructor(private store$: Store<any>) {
    }

    /**
     ** @REDUCER:
     *
     * Save error
     *-----------------------------------------------------------------
     ** @EFFECTS-ACTION:
     *
     *
     */
    static ACTION_ERROR = 'ACTION_ERROR';

    error(mess: string, e: any = null, dispatch: boolean = true): Action {
        const action = {type: RootActions.ACTION_ERROR, payload: {e, mess}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    static ACTION_NOTHING = 'ACTION_NOTHING';

    nothing(mess, dispatch: boolean = true): Action {
        const action = {type: RootActions.ACTION_NOTHING, payload: {mess}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    /**
     ** @REDUCER:
     *
     *
     *-----------------------------------------------------------------
     ** @EFFECTS-ACTION:
     *
     *
     */
    static UPDATE_NETWORK_STATUS = 'UPDATE_NETWORK_STATUS';

    updateNetworkStatus(isOnline: boolean, dispatch: boolean = true): Action {
        const action = {type: RootActions.UPDATE_NETWORK_STATUS, payload: {isOnline}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }
}
