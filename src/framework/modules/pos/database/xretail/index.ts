import {EntityDatabaseInterface} from "../../../../database/typing";
import {app, Injectable} from "../../../../general/app";
import {RetailDB} from "../../../../../platforms/react-native/modules/pos/database";

export interface RetailDBInterface {
    entityInformation: EntityDatabaseInterface;
    products: EntityDatabaseInterface;
    taxClass: EntityDatabaseInterface;
}

@Injectable()
export class DatabaseManager {
    static $id = Symbol.for("RetailDB");

    getDbInstance(): RetailDBInterface {
        try {
            return app().resolve(DatabaseManager.$id);
        } catch (e) {
            console.log('can not resolve');
            console.log(e);
        }
    }
}