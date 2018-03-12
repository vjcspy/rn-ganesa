import {Observable} from "rxjs";
import {injectable} from "inversify";
import {CoreActions} from "../../core/R/actions";
import {AccountService} from "./service";
import {Actions} from "../../../../../framework/redux-observable/actions";
import {AccountActions} from "../../../../../framework/modules/account/R/actions";
import {Effect} from "../../../../../framework/redux-observable/effect";

@injectable()
export class AccountEffects {

    constructor(protected accountActions: AccountActions, protected accountService: AccountService, protected actions$: Actions) {

    }

    @Effect() login = this.actions$.ofType(AccountActions.ACTION_LOGIN)
                          .switchMap((action) => {
                              return Observable.fromPromise(this.accountService.login(
                                  action.payload["email"],
                                  action.payload["password"]
                              )).map((user) => {
                                  return this.accountActions.afterLogin(true, {user}, false);
                              });
                          })
                          .catch(err => {
                              return Observable.of(this.accountActions.afterLogin(false, {err}, false));
                          });

    @Effect() userStateChange = this.actions$.ofType(CoreActions.ACTION_APP_DID_MOUNT)
                                    .switchMap(() => this.accountService.onUserChange()
                                                         .map(user => this.accountActions.userChange(user, false)));

    @Effect() saveUserData = this.actions$.ofType(AccountActions.ACTION_USER_CHANGE)
                                 .map((action) => {
                                     const user = action.payload["user"];
                                     return user && user["email"] ?
                                         this.accountActions.saveUser(user, false) :
                                         this.accountActions.saveUser(null, false);
                                 });

    @Effect() logout = this.actions$.ofType(AccountActions.ACTION_LOGOUT)
                           .switchMap(() => Observable.fromPromise(this.accountService.logout())
                                                      .map(() => this.accountActions.afterLogout(true, {}, false)))
                           .catch((err) => Observable.of(this.accountActions.afterLogout(false, err, false)));
}
