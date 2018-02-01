import {injectable} from "inversify";
import {RoutesService} from "./service";
import {RoutesActions} from "./actions";
import {NavigationState} from "react-navigation";
import {Actions} from "../../../../../framework/redux-observable/actions";
import {Store} from "../../../../../framework/redux-observable/store";
import {Effect} from "../../../../../framework/redux-observable/effect";
import {AccountActions} from "../../../../../framework/modules/account/R/actions";
import {AccountState} from "../../../../../framework/modules/account/R/state";

@injectable()
export class RoutesEffects {
    constructor(protected actions$: Actions,
                protected store$: Store<any>,
                protected routesService: RoutesService,
                protected routesActions: RoutesActions) {
    }

    @Effect() checkLogin = this.actions$
                               .ofType(AccountActions.ACTION_SAVE_USER)
                               .withLatestFrom(this.store$.select("account"))
                               .withLatestFrom(this.store$.select("navigatorState"), (z, z1) => [...z, z1])
                               .filter((z: any) => {
                                   const accountState: AccountState         = <any>z[1];
                                   const navigatorState: NavigationState = <any>z[2];

                                   const currentRouteName = navigatorState.routes[navigatorState.index]['routeName'];

                                   return this.routesService.isAuthorizePage(currentRouteName) === !!accountState.user;

                               })
                               .map((z: any) => {
                                   const accountState: AccountState         = <any>z[1];
                                   const navigatorState: NavigationState = <any>z[2];

                                   const currentRouteName = navigatorState.routes[navigatorState.index]['routeName'];
                                   if (this.routesService.isAuthorizePage(currentRouteName) && !!accountState.user) {
                                       return this.routesActions.navigate("outlet", null, null, false);
                                   }

                                   if (!this.routesService.isAuthorizePage(currentRouteName) && !accountState.user) {
                                       return this.routesActions.navigate("login", null, null, false);
                                   }
                               });
}
