import {ModuleConfig} from "../../framework/general/module-manager";
import {replaceModuleReducer} from "../../framework/redux/store";
import {CoreActions} from "./R/actions";
import {coreReducer} from "./R/reducer";

const name = "core";

export function boot() {
    replaceModuleReducer('core', coreReducer);
}

const services = [
    CoreActions
];


export const CoreModule: ModuleConfig = {
    name,
    boot,
    services
};
