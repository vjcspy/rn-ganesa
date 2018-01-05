import {Observable} from "rxjs";
import {
  ACTION_AFTER_LOGIN,
  ACTION_LOGIN, ACTION_SAVE_USER, ACTION_USER_CHANGE, actionAfterLogin, actionSaveUser,
  actionUserChange
} from "./actions";
import {authService} from "./service";
import {ACTION_APP_DID_MOUNT} from "../../../redux/actions";

const loginEffect = actions$ => actions$.filter((a) => a.type === ACTION_LOGIN)
                                        .switchMap((action) => {
                                          return Observable.fromPromise(authService.login(
                                            action.payload["email"],
                                            action.payload["password"]
                                          )).map((user) => {
                                            console.log(user);
                                            return actionAfterLogin(true, {user});
                                          });
                                        })
                                        .catch(err => {
                                          return Observable.of(actionAfterLogin(false, {err}));
                                        });

const userStateChangeEffect = action$ => action$.filter(action => action.type === ACTION_APP_DID_MOUNT)
                                                .switchMap(() => authService.onUserChange()
                                                                            .map(user => actionUserChange(user)));

const saveUserData = action$ => action$.ofType(ACTION_USER_CHANGE, ACTION_AFTER_LOGIN)
                                       .map((action) => {
                                         const user = action.payload["user"];
                                         return user["email"] ? actionSaveUser(user) : actionSaveUser(null);
                                       });

export const authEffects = [loginEffect, userStateChangeEffect, saveUserData];
