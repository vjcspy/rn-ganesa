import {AbstractEntityRealmDatabase} from "../../../../realm";
import {TaxDB} from "../../../../../../framework/modules/pos/database/xretail/db/tax";

export class TaxRealm extends AbstractEntityRealmDatabase {
    config = {
        name: TaxDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            tax_calculation_id: "string",
            tax_calculation_rate_id: "string",
            customer_tax_class_id: "string",
            tax_calculation_rule_id: "string",
            tax_country_id: "string",
            tax_region_id: "string",
            tax_postcode: "string",
            code: "string",
            rate: "string",
            zip_is_range: "string?",
            zip_from: "string?",
            zip_to: "string?",
            priority: "string",
            position: "string",
            calculate_subtotal: "string",
            product_tax_class_id: "string"
        }
    };
}