import {Action} from "redux";
import {injectable} from "inversify";
import {Store} from "../../../../framework/redux-observable/store";

@injectable()
export class AuthActions {
    constructor(protected store$: Store<any>) {
    }

    static ACTION_LOGIN        = "ACTION_LOGIN";
    static ACTION_LOGOUT       = "ACTION_LOGOUT";
    static ACTION_AFTER_LOGIN  = "ACTION_AFTER_LOGIN";
    static ACTION_AFTER_LOGOUT = "ACTION_AFTER_LOGOUT";
    static ACTION_USER_CHANGE  = "ACTION_USER_CHANGE";
    static ACTION_SAVE_USER    = "ACTION_SAVE_USER";

    loginWithEmail(email, password, dispatch: boolean = true): Action {
        const action = {type: AuthActions.ACTION_LOGIN, payload: {email, password}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    afterLogin(isOk, data, dispatch: boolean = true): Action {
        const action = {type: AuthActions.ACTION_AFTER_LOGIN, payload: {isOk, data}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    userChange(user, dispatch: boolean = true): Action {
        const action = {type: AuthActions.ACTION_USER_CHANGE, payload: {user}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    saveUser(user, dispatch: boolean = true): Action {
        const action = {type: AuthActions.ACTION_SAVE_USER, payload: {user}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    logout(dispatch: boolean = true): Action {
        const action = {type: AuthActions.ACTION_LOGOUT, payload: {}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }

    afterLogout(isOk, data, dispatch: boolean = true): Action {
        const action = {type: AuthActions.ACTION_AFTER_LOGOUT, payload: {isOk, data}};

        if (dispatch === true) {
            this.store$.dispatch(action);
        }

        return action;
    }
}
