import {FrameworkAccountModule} from "./account/module";
import {ModuleManager} from "../general/module-manager";
import {FrameworkPosModule} from "./pos/module";
import {FrameworkRootModule} from "./root/module";

export function frameworkModuleBoot() {
    ModuleManager.boot([
        FrameworkRootModule,
        FrameworkAccountModule,
        FrameworkPosModule
    ]);
}