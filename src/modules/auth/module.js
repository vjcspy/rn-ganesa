import {replaceModuleReducer} from "../../framework/redux/store";
import {authEffects} from "./r/effects";
import {replaceModuleEffects} from "../../framework/redux/effects";
import {authModuleReducer} from "./r/reducer";

export function authModuleBoot() {
  replaceModuleReducer("auth", authModuleReducer);
  replaceModuleEffects(authEffects);
}
