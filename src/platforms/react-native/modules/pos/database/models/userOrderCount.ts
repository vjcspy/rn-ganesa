import {AbstractEntityRealmDatabase} from "../../../../realm";
import {UserOrderCountDB} from "../../../../../../framework/modules/pos/database/xretail/db/user-order-count";

export class UserOrderCountRealm extends AbstractEntityRealmDatabase {
    config = {
        name: UserOrderCountDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            outlet_id: "string",
            register_id: "string",
            user_id: "string",
            order_count: "int",
        }
    };
}