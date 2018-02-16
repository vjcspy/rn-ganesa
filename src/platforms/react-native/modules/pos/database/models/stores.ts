import {AbstractEntityRealmDatabase} from "../../../../realm";
import {StoreDB} from "../../../../../../framework/modules/pos/database/xretail/db/store";

export class StoresRealm extends AbstractEntityRealmDatabase {
    config = {
        name: StoreDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            code: "string",
            website_id: "int",
            group_id: "int",
            name: "string",
            sort_order: "int",
            is_active: "int",
            base_currency: {
                type: "string",
                optional: true,
                json: true
            },
            current_currency: {
                type: "string",
                optional: true,
                json: true
            },
            rate: "int",
            price_format: {
                type: "string",
                optional: true,
                json: true
            },
        }
    };
}