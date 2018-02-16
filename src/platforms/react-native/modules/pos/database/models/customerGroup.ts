import {AbstractEntityRealmDatabase} from "../../../../realm";
import {CustomerGroupDB} from "../../../../../../framework/modules/pos/database/xretail/db/customer-group";

export class CustomerGroupRealm extends AbstractEntityRealmDatabase {
    config = {
        name: CustomerGroupDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            code: "string",
            tax_class_id: "string",
        }
    };
}