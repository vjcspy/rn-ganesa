import {replaceModuleReducer} from "../../redux/store";
import {ModuleConfig} from "../../general/module-manager";
import {AccountActions} from "./R/actions";
import {accountModuleReducer} from "./R/reducer";

const name = "framework_account";

function boot() {
    replaceModuleReducer("framework_account", accountModuleReducer);
}

const services = [
    AccountActions,
];

export const FrameworkAccountModule: ModuleConfig = {
    name,
    boot,
    services
};
