import {AbstractEntityRealmDatabase} from "../../../../realm";
import {TaxDB} from "../../../../../../framework/modules/pos/database/xretail/db/tax";

export class TaxRealm extends AbstractEntityRealmDatabase {
    config = {
        name: TaxDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            "tax_calculation_id": "int",
            "tax_calculation_rate_id": "int",
            "customer_tax_class_id": "int",
            "tax_class_id": "int",
            "tax_calculation_rule_id": "int",
            "tax_country_id": "string",
            "tax_region_id": "int",
            "tax_postcode": "string",
            "code": "string",
            "rate": "int",
            "zip_is_range": "string",
            "zip_from": "string",
            "zip_to": "string",
            "priority": "int",
            "position": "int",
            "calculate_subtotal": "string",
            "product_tax_class_id": "int",
        }
    };
}