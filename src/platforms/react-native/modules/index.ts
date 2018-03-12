import {AccountModule} from "./account/module";
import {CoreModule} from "./core/module";
import {ModuleManager} from "../../../framework/general/module-manager";
import {RoutesModule} from "./routes/module";
import {PosModule} from "./pos/module";

export function platformModuleBoot() {
    ModuleManager.boot([
        CoreModule,
        RoutesModule,
        AccountModule,
        PosModule,
    ]);
}
