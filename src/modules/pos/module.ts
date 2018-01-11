import {replaceModuleReducer} from "../../framework/redux/store";
import {posReducer} from "./R/index";

export function posModuleBoot() {
    replaceModuleReducer('pos', posReducer);
}
