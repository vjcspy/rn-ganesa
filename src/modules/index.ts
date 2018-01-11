import {AuthModule} from "./auth/module";
import {PosModule} from "./pos/module";
import {ModuleManager} from "../framework/general/module-manager";

ModuleManager.boot([
                       AuthModule,
                       PosModule
                   ]);
