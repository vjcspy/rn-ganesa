import {AbstractEntityRealmDatabase} from "../../../../realm";
import {CategoryDB} from "../../../../../../framework/modules/pos/database/xretail/db/category";

export class CategoryRealm extends AbstractEntityRealmDatabase {
    config = {
        name: CategoryDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            name: "string",
            parent_id: "string",
            product_ids: {
                type: "string",
                optional: true,
                json: true
            },
            is_active: "string",
            level: "string",
            position: "string",
            path: "string",
            image_url: "string?",
        }
    };
}