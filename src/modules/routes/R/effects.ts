import {injectable} from "inversify";
import {Actions} from "../../../framework/redux/observable/actions";
import {Effect} from "../../../framework/redux/observable/effect";
import {AuthActions} from "../../auth/R/actions";
import {Store} from "../../../framework/redux/observable/store";
import {AuthState} from "../../auth/R/state";
import {RoutesService} from "./service";
import {RoutesActions} from "./actions";
import {NavigationState} from "react-navigation";

@injectable()
export class RoutesEffects {
    constructor(protected actions$: Actions,
                protected store$: Store<any>,
                protected routesService: RoutesService,
                protected routesActions: RoutesActions) {}
    
    @Effect() checkLogin = this.actions$
                               .ofType(AuthActions.ACTION_SAVE_USER)
                               .withLatestFrom(this.store$.select("auth"))
                               .withLatestFrom(this.store$.select("navigatorState"), (z, z1) => [...z, z1])
                               .filter((z: any) => {
                                   const authState: AuthState            = <any>z[1];
                                   const navigatorState: NavigationState = <any>z[2];
        
                                   const currentRouteName = navigatorState.routes[navigatorState.index]['routeName'];
        
                                   return this.routesService.isAuthorizePage(currentRouteName) === !!authState.user;
        
                               })
                               .map((z: any) => {
                                   const authState: AuthState            = <any>z[1];
                                   const navigatorState: NavigationState = <any>z[2];
        
                                   const currentRouteName = navigatorState.routes[navigatorState.index]['routeName'];
                                   if (this.routesService.isAuthorizePage(currentRouteName) && !!authState.user) {
                                       return this.routesActions.navigate("outlet", null, null, false);
                                   }
        
                                   if (!this.routesService.isAuthorizePage(currentRouteName) && !authState.user) {
                                       return this.routesActions.navigate("login", null, null, false);
                                   }
                               });
}
