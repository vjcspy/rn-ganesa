import {authModuleReducer} from "./R/reducer";
import {replaceModuleReducer} from "../../redux/store";
import {ModuleConfig} from "../../general/module-manager";
import {AccountActions} from "./R/actions";

const name = "framework_account";

function boot() {
    replaceModuleReducer("framework_account", authModuleReducer);
}

const services = [
    AccountActions,
];

export const FrameworkAccountModule: ModuleConfig = {
    name,
    boot,
    services
};
