import {posReducer} from "./R";
import {ProgressBarEffect} from "./R/progress-bar/effects";
import {EffectsModule} from "../../redux-observable/effect";
import {replaceModuleReducer} from "../../redux/store";
import {ModuleConfig} from "../../general/module-manager";

const name = "framework_pos";

export function boot() {

    replaceModuleReducer('framework_pos', posReducer);
    EffectsModule.run(ProgressBarEffect);
}

const services = [
    ProgressBarEffect
];


export const FrameworkPosModule: ModuleConfig = {
    name,
    boot,
    services
};
