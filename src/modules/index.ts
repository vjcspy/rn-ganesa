import {AuthModule} from "./auth/module";
import {PosModule} from "./pos/module";
import {ModuleManager} from "../framework/general/module-manager";
import {RoutesModule} from "./routes/module";
import {CoreModule} from "./core/module";

ModuleManager.boot([
    CoreModule,
    AuthModule,
    PosModule,
    RoutesModule
]);
