import {replaceModuleReducer} from "../../framework/redux/store";
import {AuthEffects} from "./R/effects";
import {authModuleReducer} from "./R/reducer";
import {ModuleConfig} from "../../framework/general/module-manager";
import {AuthActions} from "./R/actions";
import {AuthService} from "./R/service";

const name = "authenticate";

function boot() {
    replaceModuleReducer("auth", authModuleReducer);
}

const services = [
    AuthActions,
    AuthService,
    AuthEffects
];

export const AuthModule: ModuleConfig = {
    name,
    boot,
    services
};
