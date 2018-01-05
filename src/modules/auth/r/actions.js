export class AuthActions {
  static ACTION_LOGIN       = "ACTION_LOGIN";
  static ACTION_AFTER_LOGIN = "ACTION_AFTER_LOGIN";
  
  static actionLoginWithEmail(email, password) {
    return {
      type   : AuthActions.ACTION_LOGIN,
      payload: {email, password}
    };
  }
  
  static actionAfterLogin(isOk: boolean, data) {
    return {
      type   : AuthActions.ACTION_AFTER_LOGIN,
      payload: {isOk, data}
    };
  }
}
