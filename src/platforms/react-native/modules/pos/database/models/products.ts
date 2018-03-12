import {ProductDB} from "../../../../../../framework/modules/pos/database/xretail/db/product";
import {AbstractEntityRealmDatabase} from "../../../../realm";

export class ProductsRealm extends AbstractEntityRealmDatabase {
    config = {
        name: ProductDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            sku: "string",
            name: "string",
            attribute_set_id: "string",
            price: "string?",
            tier_prices: {
                type: "string",
                optional: true,
                json: true
            },
            status: "string",
            visibility: "string",
            type_id: "string",
            tax_class_id: "string?",
            x_options: {
                type: "string",
                optional: true,
                json: true
            },
            customizable_options: {
                type: "string",
                optional: true,
                json: true
            },
            stock_items: {
                type: "string",
                optional: true,
                json: true
            },
            special_price: "string?",
            special_from_date: "string?",
            special_to_date: "string?",
            origin_image: "string?",
            media_gallery: {
                type: "string",
                optional: true,
                json: true
            }
        }
    };
}