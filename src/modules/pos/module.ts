import {replaceModuleReducer} from "../../framework/redux/store";
import {posReducer} from "./R/index";
import {ProgressBarEffect} from "./R/progress-bar/effects";
import {EffectsModule} from "../../framework/redux/observable/effect";
import {ModuleConfig} from "../../framework/general/module-manager";

const name = "pos";

export function boot() {
    replaceModuleReducer('pos', posReducer);
    EffectsModule.run(ProgressBarEffect);
}

const services = [];


export const PosModule: ModuleConfig = {
    name,
    boot,
    services
};
