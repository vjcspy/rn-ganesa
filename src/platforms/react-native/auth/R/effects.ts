import {Observable} from "rxjs";
import {injectable} from "inversify";
import {AuthActions} from "./actions";
import {AuthService} from "./service";
import {CoreActions} from "../../core/R/actions";
import {Actions} from "../../../../framework/redux-observable/actions";
import {Effect} from "../../../../framework/redux-observable/effect";

@injectable()
export class AuthEffects {

    constructor(protected authActions: AuthActions, protected authService: AuthService, protected actions$: Actions) {

    }

    @Effect() login = this.actions$.ofType(AuthActions.ACTION_LOGIN)
                          .switchMap((action) => {
                              return Observable.fromPromise(this.authService.login(
                                  action.payload["email"],
                                  action.payload["password"]
                              )).map((user) => {
                                  return this.authActions.afterLogin(true, {user}, false);
                              });
                          })
                          .catch(err => {
                              return Observable.of(this.authActions.afterLogin(false, {err}, false));
                          });

    @Effect() userStateChange = this.actions$.ofType(CoreActions.ACTION_APP_DID_MOUNT)
                                    .switchMap(() => this.authService.onUserChange()
                                                         .map(user => this.authActions.userChange(user, false)));

    @Effect() saveUserData = this.actions$.ofType(AuthActions.ACTION_USER_CHANGE)
                                 .map((action) => {
                                     const user = action.payload["user"];
                                     return user && user["email"] ?
                                         this.authActions.saveUser(user, false) :
                                         this.authActions.saveUser(null, false);
                                 });

    @Effect() logout = this.actions$.ofType(AuthActions.ACTION_LOGOUT)
                           .switchMap(() => Observable.fromPromise(this.authService.logout())
                                                      .map(() => this.authActions.afterLogout(true, {}, false)))
                           .catch((err) => Observable.of(this.authActions.afterLogout(false, err, false)));
}
