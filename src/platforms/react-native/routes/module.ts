import {RoutesEffects} from "./R/effects";
import {ModuleConfig} from "../../../framework/general/module-manager";
import {EffectsModule} from "../../../framework/redux-observable/effect";
import {RoutesActions} from "./R/actions";
import {RoutesService} from "./R/service";
import {replaceModuleReducer} from "../../../framework/redux/store";
import {routesModuleReducer} from "./R/reducer";

const name = "routes";

export function boot() {
    replaceModuleReducer(name, routesModuleReducer);
    EffectsModule.run(RoutesEffects);
}

const services = [
    RoutesService,
    RoutesActions,
    RoutesEffects,
];


export const RoutesModule: ModuleConfig = {
    name,
    boot,
    services
};
