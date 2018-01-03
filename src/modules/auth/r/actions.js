export class AuthActions {
  static ACTION_LOGIN = "ACTION_LOGIN";
  
  static login(user) {
    return {
      type   : AuthActions.ACTION_LOGIN,
      payload: {user}
    };
  }
}
