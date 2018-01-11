import {AuthModule} from "./auth/module";
import {PosModule} from "./pos/module";
import {ModuleManager} from "../framework/general/module-manager";
import {RoutesModule} from "./routes/module";

ModuleManager.boot([
                       AuthModule,
                       PosModule,
                       RoutesModule
                   ]);
