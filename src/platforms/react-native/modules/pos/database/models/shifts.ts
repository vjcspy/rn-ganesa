import {AbstractEntityRealmDatabase} from "../../../../realm";
import {ShiftDB} from "../../../../../../framework/modules/pos/database/xretail/db/shift";

export class ShiftsRealm extends AbstractEntityRealmDatabase {
    config = {
        name: ShiftDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            outlet_id: "string",
            register_id: "string",
            user_open_id: "string",
            user_close_id: "string",
            user_open_name: "string",
            user_close_name: "string",
            open_note: "string",
            close_note: "string",
            data: "string",
            point_earned: "string",
            point_spent: "string",
            total_adjustment: "string",
            total_expected_amount: "string",
            total_counted_amount: "string",
            total_net_amount: "string",
            take_out_amount: "string",
            start_amount: "string",
            open_at: "string",
            close_at: "string",
            is_open: "string",
        }
    };
}