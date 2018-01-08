import {replaceModuleReducer} from "../../redux/store";
import {posReducer} from "./r/reducer";

export function posModuleBoot() {
    replaceModuleReducer('pos', posReducer);
}
