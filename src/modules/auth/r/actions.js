import {Actions} from "../../../redux/actions";

export class AuthActions extends Actions {
  static ACTION_LOGIN       = "ACTION_LOGIN";
  static ACTION_AFTER_LOGIN = "ACTION_AFTER_LOGIN";
  
  constructor(dispatch = null) {
    super();
    return this.init("auth", dispatch, this);
  }
  
  actionLoginWithEmail(email, password, dispatch = true) {
    const action = {
      type   : AuthActions.ACTION_LOGIN,
      payload: {email, password}
    };
    if (dispatch) {
      this.dispatch(action);
    }
    return action;
  }
  
  actionAfterLogin(isOk: boolean, data = {}, dispatch = true) {
    const action = {
      type   : AuthActions.ACTION_AFTER_LOGIN,
      payload: {isOk, data}
    };
    if (dispatch) {
      this.dispatch(action);
    }
    return action;
  }
}
