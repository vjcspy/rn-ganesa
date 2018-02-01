import {AccountEffects} from "./R/effects";
import {AccountService} from "./R/service";
import {EffectsModule} from "../../../../framework/redux-observable/effect";
import {ModuleConfig} from "../../../../framework/general/module-manager";

const name = "account";

function boot() {
    EffectsModule.run(AccountEffects)
}

const services = [
    AccountEffects,
    AccountService
];

export const AccountModule: ModuleConfig = {
    name,
    boot,
    services
};
