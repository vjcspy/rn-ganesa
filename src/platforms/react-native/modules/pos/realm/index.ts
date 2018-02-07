import {EntityInformationRealm} from "./models/entity-information";
import {ProductsRealm} from "./models/products";
import {TaxClassRealm} from "./models/tax-class";
import {RetailDBInterface} from "../../../../../framework/modules/pos/database/xretail";

export class RetailDB implements RetailDBInterface {
    entityInformation = new EntityInformationRealm();
    products          = new ProductsRealm();
    taxClass          = new TaxClassRealm();
}