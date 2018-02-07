import {EntityDatabaseInterface} from "../../../../database/typing";
import {app, Injectable} from "../../../../general/app";

export interface RetailDBInterface {
    entityInformation: EntityDatabaseInterface;
    products: EntityDatabaseInterface;
    taxClass: EntityDatabaseInterface;
}

@Injectable()
export class DatabaseManager {
    getDbInstance(): RetailDBInterface {
        return app().resolve(Symbol.for("RetailDB"));
    }
}