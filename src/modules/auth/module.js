import {replaceModuleReducer} from "../../redux/store";
import {authEffects} from "./r/effects";
import {replaceModuleEffects} from "../../redux/effects";
import {authModuleReducer} from "./r/reducer";

export function authModuleBoot() {
  replaceModuleReducer("auth", authModuleReducer);
  replaceModuleEffects(authEffects);
}
