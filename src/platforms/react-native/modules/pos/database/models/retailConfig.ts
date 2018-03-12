import {AbstractEntityRealmDatabase} from "../../../../realm";
import {RetailConfigDB} from "../../../../../../framework/modules/pos/database/xretail/db/retail-config";

export class RetailConfigRealm extends AbstractEntityRealmDatabase {
    config = {
        name: RetailConfigDB.getCode(),
        primaryKey: "key",
        properties: {
            key: "string",
            value: {
                type: "string",
                optional: true,
                json: true
            },
        }
    };
}