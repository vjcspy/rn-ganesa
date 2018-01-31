import * as Realm from 'realm';
import {CarSchema} from "./sample/car";

export class DB {

    static $config = {
        schema: [CarSchema],
        path: Realm['default'].path
    };

    static get Realm(): Realm {
        return Realm['default'];
    }

    static async run(callBack: (_realm) => void) {
        Realm.open(DB.$config)
             .then((realm) => callBack(realm))
             .catch((e) => console.log(e));
    }

    static deleteDB() {
        try {
            DB.Realm['deleteFile']({
                path: DB.Realm.path
            });
        } catch (e) {
            console.log("delete db error");
        }
    }
}