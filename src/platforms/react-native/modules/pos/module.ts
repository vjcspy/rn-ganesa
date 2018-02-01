import {ModuleConfig} from "../../../../framework/general/module-manager";

const name = "pos";

export function boot() {

}

const services = [];


export const PosModule: ModuleConfig = {
    name,
    boot,
    services
};
