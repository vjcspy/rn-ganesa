import {FrameworkAccountModule} from "./account/module";
import {ModuleManager} from "../general/module-manager";

export function frameworkModuleBoot() {
    ModuleManager.boot([
        FrameworkAccountModule
    ]);
}