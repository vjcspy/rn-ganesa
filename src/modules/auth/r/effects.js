import {Observable} from "rxjs";
import "rxjs";
import {AuthActions} from "./actions";
import {authService} from "./service";

const loginEffect = actions$ => actions$.filter((a) => a.type === AuthActions.ACTION_LOGIN)
                                        .switchMap((action) => {
                                          return Observable.fromPromise(authService.login(
                                            action.payload["email"],
                                            action.payload["password"]
                                          ));
                                        })
                                        .catch(err => {
                                          return Observable.of((new AuthActions()).actionAfterLogin(
                                            false,
                                            {err},
                                            false
                                          ));
                                        });

export const authEffects = [loginEffect];
