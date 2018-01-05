import {Observable} from "rxjs";
import {ACTION_LOGIN, ACTION_LOGOUT, ACTION_USER_CHANGE, actionAfterLogin, actionAfterLogout, actionSaveUser, actionUserChange} from "./actions";
import {authService} from "./service";
import {ACTION_APP_DID_MOUNT} from "../../../redux/actions";

const login = actions$ => actions$.ofType(ACTION_LOGIN)
                                  .switchMap((action) => {
                                    return Observable.fromPromise(authService.login(
                                      action.payload["email"],
                                      action.payload["password"]
                                    )).map((user) => {
                                      return actionAfterLogin(true, {user});
                                    });
                                  })
                                  .catch(err => {
                                    return Observable.of(actionAfterLogin(false, {err}));
                                  });

const userStateChange = action$ => action$.ofType(ACTION_APP_DID_MOUNT)
                                          .switchMap(() => authService.onUserChange()
                                                                      .map(user => actionUserChange(user)));

const saveUserData = action$ => action$.ofType(ACTION_USER_CHANGE)
                                       .map((action) => {
                                         const user = action.payload["user"];
                                         return user && user["email"] ? actionSaveUser(user) : actionSaveUser(null);
                                       });

const logout = action$ => action$.ofType(ACTION_LOGOUT)
                                 .switchMap(() => Observable.fromPromise(authService.logout())
                                                            .map(() => actionAfterLogout()))
                                 .catch((err) => Observable.of(actionAfterLogout(false, err)));

export const authEffects = [login, userStateChange, saveUserData, logout];
