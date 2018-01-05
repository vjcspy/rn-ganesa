import {combineEpics} from "redux-observable";
import {createEpicMiddleware} from "redux-observable";
import * as _ from "lodash";
import "rxjs";

const exampleEffect = action$ => {
  return action$.filter(action => action.type === "PING")
                .delay(1000) // Asynchronously wait 1000ms then continue
                .mapTo({type: "PONG"});
};

let appEffects = [exampleEffect];

export function createAppEffects(asyncEffects: Array = []) {
  appEffects = _.union(_.concat(appEffects, ...asyncEffects));
  return combineEpics(...appEffects);
}

export const effectMiddleware = createEpicMiddleware(createAppEffects());

export function replaceModuleEffects(asyncEffects: Array = []) {
  effectMiddleware.replaceEpic(createAppEffects(asyncEffects));
}
