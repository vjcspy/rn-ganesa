import {AbstractEntityRealmDatabase} from "../../../../realm";
import {CustomerDB} from "../../../../../../framework/modules/pos/database/xretail/db/customer";

export class CustomerRealm extends AbstractEntityRealmDatabase {
    config = {
        name: CustomerDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            customer_group_id: "int",
            default_billing: "int",
            default_shipping: "string",
            email: "string",
            first_name: "string",
            last_name: "string",
            gender: "int",
            store_id: "int",
            website_id: "int",
            telephone: "string",
            address: {
                type: "string",
                optional: true,
                json: true
            },
        }
    };
}