import {posReducer} from "./R";
import {ProgressBarEffect} from "./R/progress-bar/effects";
import {EffectsModule} from "../../redux-observable/effect";
import {replaceModuleReducer} from "../../redux/store";
import {ModuleConfig} from "../../general/module-manager";
import {ProgressActions} from "./R/progress-bar/actions";
import {PosGeneralActions} from "./R/general/general.actions";
import {PosEntitiesActions} from "./R/entities/entities.actions";
import {PosPullActions} from "./R/entities/pull.actions";
import {ApiManager} from "./services/api-manager";
import {DatabaseManager} from "./database/xretail";

const name = "framework_pos";

export function boot() {

    replaceModuleReducer('framework_pos', posReducer);
    EffectsModule.run(ProgressBarEffect);
}

const services = [
    ApiManager,
    DatabaseManager,

    ProgressActions,
    ProgressBarEffect,

    PosGeneralActions,
    PosEntitiesActions,
    PosPullActions,

];


export const FrameworkPosModule: ModuleConfig = {
    name,
    boot,
    services
};
