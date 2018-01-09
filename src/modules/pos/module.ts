import {replaceModuleReducer} from "../../redux/store";
import {posReducer} from "./r/index";

export function posModuleBoot() {
    replaceModuleReducer('pos', posReducer);
}
