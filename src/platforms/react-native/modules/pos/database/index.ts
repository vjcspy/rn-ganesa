import {Injectable} from "../../../../../framework/general/app";
import {DatabaseManager, RetailDBInterface} from "../../../../../framework/modules/pos/database/xretail";
import {EntityInformationRealm} from "./models/entity-information";
import {ProductsRealm} from "./models/products";
import {TaxClassRealm} from "./models/tax-class";

@Injectable()
export class RetailDB implements RetailDBInterface {
    entityInformation = new EntityInformationRealm();
    products          = new ProductsRealm();
    taxClass          = new TaxClassRealm();

    getSchema() {
        return [
            this.entityInformation.config,
            this.products.config,
            this.taxClass.config,
        ];
    }
}

