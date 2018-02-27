import {injectable} from "inversify";
import {RetailConfigDB} from "../database/xretail/db/retail-config";
import {SettingDB} from "../database/xretail/db/setting";
import {TaxClassDB} from "../database/xretail/db/tax-class";
import {TaxDB} from "../database/xretail/db/tax";
import {ReceiptDB} from "../database/xretail/db/receipt";
import {PaymentDB} from "../database/xretail/db/payment";
import {UserOrderCountDB} from "../database/xretail/db/user-order-count";
import {CustomerGroupDB} from "../database/xretail/db/customer-group";
import {CategoryDB} from "../database/xretail/db/category";
import {ProductDB} from "../database/xretail/db/product";
import {OrderDB} from "../database/xretail/db/order";

@injectable()
export class EntitiesHelper {
    getFullEntityPull() {
        return [
            RetailConfigDB.getCode(),
            SettingDB.getCode(),
            TaxClassDB.getCode(),
            TaxDB.getCode(),
            ReceiptDB.getCode(),
            PaymentDB.getCode(),
            UserOrderCountDB.getCode(),
            CustomerGroupDB.getCode(),
            CategoryDB.getCode(),
            ProductDB.getCode(),
            OrderDB.getCode()
        ]
    }
}