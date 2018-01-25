import {ModuleConfig} from "../../framework/general/module-manager";
import {replaceModuleReducer} from "../../framework/redux/store";
import {CoreActions} from "./R/actions";

const name = "core";

export function boot() {
}

const services = [
    CoreActions
];


export const CoreModule: ModuleConfig = {
    name,
    boot,
    services
};
