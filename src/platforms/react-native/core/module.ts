import {CoreActions} from "./R/actions";
import {ModuleConfig} from "../../../framework/general/module-manager";

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
