import {AbstractEntityRealmDatabase} from "../../../../realm";
import {OrderDB} from "../../../../../../framework/modules/pos/database/xretail/db/order";

export class OrdersRealm extends AbstractEntityRealmDatabase {
    config = {
        name: OrderDB.getCode(),
        properties: {
            id: "string?",
            order_id: "string",
            status: "string",
            increment_id: "string",
            retail_id: "string",
            retail_note: "string?",
            retail_status: "string",
            can_creditmemo: "bool",
            can_ship: "bool",
            can_invoice: "bool",
            sync_data: "string?",
            pushed: "int?", // 0: not pushed, 1: pushed success, 3: pushed failed
            customer: {
                type: "string",
                optional: true,
                json: true
            },
            items: {
                type: "string",
                optional: true,
                json: true
            },
            billing_address: {
                type: "string",
                optional: true,
                json: true
            },
            shipping_address: {
                type: "string",
                optional: true,
                json: true
            },
            totals: {
                type: "string",
                optional: true,
                json: true
            },
            created_at: "string",
        }
    };
}