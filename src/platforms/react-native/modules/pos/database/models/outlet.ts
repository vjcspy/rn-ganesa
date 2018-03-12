import {AbstractEntityRealmDatabase} from "../../../../realm";
import {OutletDB} from "../../../../../../framework/modules/pos/database/xretail/db/outlet";

export class OutletRealm extends AbstractEntityRealmDatabase {
    config = {
        name: OutletDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            name: "string",
            is_active: "string",
            warehouse_id: "string",
            registers: {
                type: "string",
                optional: true,
                json: true
            },
            cashier_ids: "string",
            enable_guest_checkout: "string",
            tax_calculation_based_on: "string",
            paper_receipt_template_id: "string",
            street: "string",
            city: "string",
            country_id: "string",
            region_id: "string",
            postcode: "string",
            telephone: "string",
        }
    };
}