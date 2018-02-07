import {RootActions} from "./R/actions";
import {rootReducer} from "./R/reducer";
import {replaceModuleReducer} from "../../redux/store";
import {ModuleConfig} from "../../general/module-manager";

const name = "framework_root";

export function boot() {
    replaceModuleReducer('framework_root', rootReducer);
}

const services = [
    RootActions

];


export const FrameworkRootModule: ModuleConfig = {
    name,
    boot,
    services
};
