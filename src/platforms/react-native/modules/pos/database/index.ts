import {Injectable} from "../../../../../framework/general/app";
import {DatabaseManager, RetailDBInterface} from "../../../../../framework/modules/pos/database/xretail";
import {EntityInformationRealm} from "./models/entity-information";
import {ProductsRealm} from "./models/products";
import {TaxClassRealm} from "./models/tax-class";
import {CategoryRealm} from "./models/category";
import {CustomerRealm} from "./models/customer";
import {CustomerGroupRealm} from "./models/customerGroup";
import {OrdersRealm} from "./models/orders";
import {OutletRealm} from "./models/outlet";
import {PaymentRealm} from "./models/payment";
import {ReceiptsRealm} from "./models/receipts";
import {RetailConfigRealm} from "./models/retailConfig";
import {SettingsRealm} from "./models/settings";
import {ShiftsRealm} from "./models/shifts";
import {StoresRealm} from "./models/stores";
import {TaxRealm} from "./models/tax";
import {UserOrderCountRealm} from "./models/userOrderCount";

@Injectable()
export class RetailDB implements RetailDBInterface {

    category          = new CategoryRealm();
    customers         = new CustomerRealm();
    customerGroup     = new CustomerGroupRealm();
    entityInformation = new EntityInformationRealm();
    orders            = new OrdersRealm();
    outlet            = new OutletRealm();
    payment           = new PaymentRealm();
    products          = new ProductsRealm();
    receipts          = new ReceiptsRealm();
    retailConfig      = new RetailConfigRealm();
    settings          = new SettingsRealm();
    shifts            = new ShiftsRealm();
    stores            = new StoresRealm();
    taxes               = new TaxRealm();
    taxClass          = new TaxClassRealm();
    userOrderCount    = new UserOrderCountRealm();

    getSchema() {
        return [
            this.category.config,
            this.customers.config,
            this.customerGroup.config,
            this.entityInformation.config,
            this.orders.config,
            this.outlet.config,
            this.payment.config,
            this.products.config,
            this.receipts.config,
            this.retailConfig.config,
            this.settings.config,
            this.shifts.config,
            this.stores.config,
            this.taxes.config,
            this.taxClass.config,
            this.userOrderCount.config,
        ];
    }
}

