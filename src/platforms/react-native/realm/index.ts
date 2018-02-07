import * as Realm from 'realm';
import {EntityDatabaseInterface} from "../../../framework/database/typing";
import {GeneralMessage} from "../../../framework/modules/pos/core/framework/General/Typing/Message";
import {DataObject} from "../../../framework/modules/pos/core/framework/General/DataObject";
import * as _ from 'lodash';

export class RealmDB {

    static $config = {
        schema: [],
        path: Realm['default'].path
    };

    static get Realm(): Realm {
        return Realm['default'];
    }

    static async run(callBack: (_realm) => void) {
        Realm.open(RealmDB.$config)
             .then((realm) => {
                 try {
                     callBack(realm);
                 } catch (e) {
                     console.log(e);
                 }
             })
             .catch((e) => console.log(e));
    }

    static deleteDB() {
        try {
            RealmDB.Realm['deleteFile']({
                path: RealmDB.Realm.path
            });
        } catch (e) {
            console.log("delete db error");
        }
    }
}

export class AbstractEntityRealmDatabase extends DataObject implements EntityDatabaseInterface {
    public config: any;

    query(where?: string): Promise<GeneralMessage> {
        return this.get(where);
    }

    async toArray(): Promise<any[]> {
        let gData = await this.query();

        return gData.isError !== true ? gData.data : [];
    }

    bulkAdd(data: Object[], update?: boolean): Promise<GeneralMessage> {
        return new Promise((resolve, reject) => {
            RealmDB.run((realm) => {
                realm.write(() => {
                    try {
                        _.forEach(data, (d) => {
                            try {
                                let i = {};

                                _.forEach(this.config['properties'], (p, key) => {
                                    if (p['json'] === true) {
                                        try {
                                            i[key] = JSON.stringify(d[key])
                                        } catch {

                                        }
                                    } else {
                                        i[key] = d[key];
                                    }
                                });

                                realm.create(this.config['name'], i, update === true);
                            } catch (e) {
                                console.log(e);
                            }
                        });

                        resolve({
                            isError: false
                        });
                    } catch (e) {
                        reject({
                            isError: true,
                            message: "clear entity error",
                            e
                        });
                    }
                });
            });

        });
    }

    get(where?: string): Promise<GeneralMessage> {
        return new Promise((resolve, reject) => {
            RealmDB.run((realm) => {
                const s = where ? realm.objects(this.config['name']).filtered(where) : realm.objects(this.config['name']);
                try {
                    let data = [];
                    s.forEach((e) => {
                        let i: DataObject = this.factory();

                        _.forEach(this.config['properties'], (p, key) => {
                            if (p['json'] === true && _.isString(e[key])) {
                                try {
                                    i.setData(key, JSON.parse(e[key]));
                                } catch {

                                }
                            } else {
                                i.setData(key, e[key]);
                            }
                        });

                        data.push(i);
                    });

                    resolve({
                        isError: false,
                        data
                    });
                } catch (e) {
                    reject({
                        isError: true,
                        message: "clear entity error",
                        e
                    });
                }
            });
        });
    }

    delete(where: string): Promise<GeneralMessage> {
        return new Promise(((resolve, reject) => {
            RealmDB.run((realm) => {
                realm.write(() => {
                    try {
                        let allEntity = realm.objects(this.config['name']).filtered(where);
                        realm.delete(allEntity);
                        resolve({
                            isError: false
                        });
                    } catch (e) {
                        reject({
                            isError: true,
                            message: "clear entity error",
                            e
                        });
                    }
                });
            });
        }));
    }

    save(data: DataObject, update: boolean = true): Promise<any> {
        return new Promise((resolve, reject) => {
            RealmDB.run((realm) => {
                realm.write(() => {
                    try {
                        let i = {};

                        _.forEach(this.config['properties'], (p, key) => {
                            if (p['json'] === true) {
                                try {
                                    i[key] = JSON.stringify(data.getData(key))
                                } catch {

                                }
                            } else {
                                i[key] = data.getData(key);
                            }
                        });

                        realm.create(this.config['name'], i, update === true);
                        resolve({
                            isError: false
                        });
                    } catch (e) {
                        reject({
                            isError: true,
                            message: "clear entity error",
                            e
                        });
                    }
                });
            });

        });
    }

    clear(): Promise<GeneralMessage> {
        return new Promise((resolve, reject) => {
            RealmDB.run((realm) => {
                try {
                    realm.deleteModel(this.config['name']);
                    resolve({
                        isError: false
                    });
                } catch (e) {
                    reject({
                        isError: true,
                        message: "clear entity error",
                        e
                    });
                }
            });
        });
    }

    factory() {
        return new DataObject();
    }
}