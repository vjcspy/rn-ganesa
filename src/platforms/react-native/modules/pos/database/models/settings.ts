import {AbstractEntityRealmDatabase} from "../../../../realm";
import {SettingDB} from "../../../../../../framework/modules/pos/database/xretail/db/setting";

export class SettingsRealm extends AbstractEntityRealmDatabase {
    config = {
        name: SettingDB.getCode(),
        primaryKey: "key",
        properties: {
            key: "string",
            value: {
                type: "string",
                optional: true,
                json: true
            },
            store_id: "int"
        }
    };
}