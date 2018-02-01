import {RoutesEffects} from "./R/effects";
import {RoutesActions} from "./R/actions";
import {RoutesService} from "./R/service";
import {routesModuleReducer} from "./R/reducer";
import {replaceModuleReducer} from "../../../../framework/redux/store";
import {EffectsModule} from "../../../../framework/redux-observable/effect";
import {ModuleConfig} from "../../../../framework/general/module-manager";

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
