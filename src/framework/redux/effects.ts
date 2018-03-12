import {combineEpics} from "redux-observable";
import {createEpicMiddleware} from "redux-observable";
import * as _ from "lodash";
import "rxjs";



let appEffects = [];

export function createAppEffects(asyncEffects = []) {
    appEffects = _.uniq(_.concat(appEffects, ...asyncEffects));
    return combineEpics(...appEffects);
}

export const effectMiddleware = createEpicMiddleware(createAppEffects());

export function replaceModuleEffects(asyncEffects) {
    effectMiddleware.replaceEpic(createAppEffects(asyncEffects));
}
