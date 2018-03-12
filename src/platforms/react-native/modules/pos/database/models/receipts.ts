import {AbstractEntityRealmDatabase} from "../../../../realm";
import {ReceiptDB} from "../../../../../../framework/modules/pos/database/xretail/db/receipt";

export class ReceiptsRealm extends AbstractEntityRealmDatabase {
    config = {
        name: ReceiptDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            logo_url: "string",
            footer_url: "string",
            header: "string",
            footer: "string",
            customer_info: "string",
            font_type: "string",
            barcode_symbology: "string",
            row_total_incl_tax: "string",
            subtotal_incl_tax: "string",
            enable_barcode: "string",
            enable_power_text: "string",
            order_info: {
                type: "string",
                optional: true,
                json: true
            },
            is_default: "bool",
        }
    };
}