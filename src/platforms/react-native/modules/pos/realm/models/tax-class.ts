import {AbstractEntityRealmDatabase} from "../../../../database";
import {TaxClassDB} from "../../../../../../framework/modules/pos/database/xretail/db/tax-class";

export class TaxClassRealm extends AbstractEntityRealmDatabase {
    config = {
        name: TaxClassDB.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            name: "string",
            type: "string",
        }
    };
}