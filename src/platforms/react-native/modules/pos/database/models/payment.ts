import {AbstractEntityRealmDatabase} from "../../../../realm";
import {PaymentDB} from "../../../../../../framework/modules/pos/database/xretail/db/payment";

export class PaymentRealm extends AbstractEntityRealmDatabase {
    config = {
        name: PaymentDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            type: "string",
            title: "string",
            payment_data: {
                type: "string",
                optional: true,
                json: true
            },
            is_active: "string",
            is_dummy: "string",
            allow_amount_tendered: "string",
        }
    };
}