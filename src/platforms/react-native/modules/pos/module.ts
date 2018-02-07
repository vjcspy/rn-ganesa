import {ModuleConfig} from "../../../../framework/general/module-manager";
import {app} from "../../../../framework/general/app";
import {DatabaseManager} from "../../../../framework/modules/pos/database/xretail";
import {RetailDB} from "./database";
import {RealmDB} from "../../realm";

const name = "pos";

export function boot() {

    // Config realm
    app().bindTo(DatabaseManager.$id, RetailDB);
    RealmDB.$config.schema = [
        ...app().resolve<RetailDB>(DatabaseManager.$id).getSchema()
    ];
}

const services = [];


export const PosModule: ModuleConfig = {
    name,
    boot,
    services
};
