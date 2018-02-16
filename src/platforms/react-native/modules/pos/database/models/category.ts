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
            product_ids: "string",
            is_active: "string",
            level: "int",
            position: "string",
            path: "string",
            image_url: "string?",
        }
    };
}