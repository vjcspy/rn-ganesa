import {FrameworkAccountModule} from "./account/module";
import {ModuleManager} from "../general/module-manager";
import {FrameworkPosModule} from "./pos/module";

export function frameworkModuleBoot() {
    ModuleManager.boot([
        FrameworkAccountModule,
        FrameworkPosModule
    ]);
}