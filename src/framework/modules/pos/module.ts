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
import {PosEntitiesService} from "./R/entities/entities.service";
import {PosEntitiesEffects} from "./R/entities/entities.effects";
import {PosPullEffects} from "./R/entities/pull.effects";

const name = "framework_pos";


export function boot() {
    replaceModuleReducer('framework_pos', posReducer);
    EffectsModule.run(ProgressBarEffect);
    EffectsModule.run(PosEntitiesEffects);
    EffectsModule.run(PosPullEffects);
}

const services = [
    ApiManager,
    DatabaseManager,

    ProgressActions,
    ProgressBarEffect,

    PosGeneralActions,

    PosEntitiesActions,
    PosEntitiesService,
    PosEntitiesEffects,
    PosPullActions,
    PosPullEffects,
];


export const FrameworkPosModule: ModuleConfig = {
    name,
    boot,
    services
};
