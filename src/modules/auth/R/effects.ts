import {Observable} from "rxjs";
import {injectable} from "inversify";
import {Subject} from "rxjs/Subject";
import {Effect} from "../../../framework/redux/observable/effect";
import {AuthActions} from "./actions";
import {AuthService} from "./service";
import {AppActions} from "../../../framework/redux/actions";

@injectable()
export class AuthEffects {
    public action$ = new Subject<any>();
    
    constructor(protected authActions: AuthActions, protected authService: AuthService) {
    
    }
    
    @Effect() login = actions$ => actions$.ofType(AuthActions.ACTION_LOGIN)
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
    
    @Effect() userStateChange = action$ => action$.ofType(AppActions.ACTION_APP_DID_MOUNT)
                                                  .switchMap(() => this.authService.onUserChange()
                                                                       .map(user => this.authActions.userChange(user, false)));
    
    @Effect() saveUserData = action$ => action$.ofType(AuthActions.ACTION_USER_CHANGE)
                                               .map((action) => {
                                                   const user = action.payload["user"];
                                                   return user && user["email"] ?
                                                       this.authActions.saveUser(user, false) :
                                                       this.authActions.saveUser(null, false);
                                               });
    
    @Effect() logout = action$ => action$.ofType(AuthActions.ACTION_LOGOUT)
                                         .switchMap(() => Observable.fromPromise(this.authService.logout())
                                                                    .map(() => this.authActions.afterLogout(true, {}, false)))
                                         .catch((err) => Observable.of(this.authActions.afterLogout(false, err, false)));
}
