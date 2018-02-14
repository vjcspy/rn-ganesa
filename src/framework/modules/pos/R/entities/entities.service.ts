import * as _ from 'lodash';
import {Injectable} from "../../../../general/app";
import {RequestService} from "../../../../utils/services/request";
import {ApiManager} from "../../services/api-manager";
import {EntityInformation} from "../../database/xretail/db/entity-information";
import {PosGeneralState} from "../general/general.state";
import {Entity} from "./entities.model";
import {GeneralMessage} from "../../core/framework/General/Typing/Message";
import {GeneralException} from "../../core/framework/General/Exception/GeneralException";
import {ProductDB} from "../../database/xretail/db/product";
import {DatabaseManager} from "../../database/xretail";
import {DataObject} from "../../core/framework/General/DataObject";

@Injectable()
export class PosEntitiesService {

    constructor(private databaseManager: DatabaseManager,
                private requestService: RequestService,
                private apiManager: ApiManager) {
    }

    getEntityDataInformation(entity: string): Promise<DataObject> {
        return new Promise(async (resolve, reject) => {
            let db = this.databaseManager.getDbInstance();
            try {
                console.log('before get');
                let gData = await db.entityInformation.get('id = "' + entity + '"');

                if (gData.isError !== true) {
                    resolve(gData.data.length === 1 ? _.first(gData.data) : null);
                } else {
                    reject(gData.e);
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });

    }

    async getStateCurrentEntityDb(generalState: PosGeneralState, entity: Entity): Promise<GeneralMessage> {
        return new Promise<GeneralMessage>(async (resolve, reject) => {
            try {
                const entityCode   = entity.entityCode;
                let db             = this.databaseManager.getDbInstance();
                let entityDataInfo = await this.getEntityDataInformation(entity.entityCode);
                console.log(entityDataInfo);
                if (entity.isDependStore === true && (!generalState.store || parseInt(generalState.store['id']) < 1)) {
                    throw new GeneralException("please_select_outlet_before");
                }

                // if difference store id will flush
                if (entityDataInfo
                    && (
                        (entity.isDependStore === true && generalState.store['id'] !== entityDataInfo.getData("storeId"))
                        || entity.pageSize !== entityDataInfo.getData("pageSize") || generalState.baseUrl !== entityDataInfo.getData("base_url")
                    )
                ) {
                    await this.whenNotValidDb(entityCode);
                    entityDataInfo = null;
                }

                // never init before
                if (!entityDataInfo || !entityDataInfo.hasOwnProperty('id')) {
                    // First time pull data so we init default value
                    let entityDataInfo         = new EntityInformation();
                    entityDataInfo.id          = entityCode;
                    entityDataInfo.currentPage = 0;
                    entityDataInfo.isFinished  = false;
                    entityDataInfo.pageSize    = entity.pageSize;
                    entityDataInfo.storeId     = entity.isDependStore === true ? generalState.store['id'] : null;
                    entityDataInfo.base_url    = generalState.baseUrl;

                    await db.entityInformation.save(entityDataInfo, true);

                    return resolve({data: {notValidDB: true}});
                }

                resolve(entityDataInfo.hasOwnProperty('id')
                && entityDataInfo.getData("id") === entityCode
                && entityDataInfo.getData("isFinished") === true
                && (entity.isDependStore !== true || entityDataInfo.getData("storeId") === generalState.store['id']) ?
                    {data: {isFinished: true}} : {
                        data: {
                            isFinished: false,
                            currentPage: entityDataInfo.getData("currentPage")
                        }
                    });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    protected async whenNotValidDb(entity: string): Promise<any> {
        console.log("Not valid db entity: " + entity);
        await this.deleteEntityInfo(entity);
    }

    async deleteEntityInfo(entity: string): Promise<any> {
        let db = this.databaseManager.getDbInstance();
        await db[entity].clear();
        await db.entityInformation.delete('id = "' + entity + '"');
    }

    async pullAndSaveDb(entity: Entity, generalState: PosGeneralState): Promise<GeneralMessage> {
        let db = this.databaseManager.getDbInstance();

        return new Promise((resolve, reject) => {
            let url            = this.apiManager.get(entity.apiUrlCode, generalState.baseUrl);
            const nextPagePull = (entity.currentPage + 1);
            url += url.indexOf("?") > -1 ? "&" : "?" + entity.query;
            this.requestService
                .makeGet(url)
                .subscribe(
                    async (data) => {
                        let items: any = <any> data['items'];

                        // Product Pull DataInfo
                        let entityInfo = await this.getEntityDataInformation(entity.entityCode);

                        if (_.isEmpty(items)) {
                            // finished
                            entityInfo.setData("isFinished", true);
                            entityInfo.setData("cache_time", data['cache_time']);
                            await db.entityInformation.save(entityInfo, true);

                            return resolve({error: false, data: {isFinished: true}});
                        } else {
                            try {
                                await db[entity.entityCode].bulkAdd(items, true);
                            } catch (e) {
                                console.log("add entities to cache failed " + entity.entityCode + ", try to put again");
                            }

                            const additionData = {
                                lastPageNumber: data['last_page_number'],
                                totalCount: data['total_count'],
                                isLoadFromCache: data['is_load_from_cache']
                            };

                            // save data pull success
                            entityInfo.setData("currentPage", nextPagePull);
                            entityInfo.setData("cache_time", data['cache_time']);
                            entityInfo.setData("additionData", additionData);

                            await db.entityInformation.save(entityInfo, true);

                            return resolve({
                                error: false,
                                data: {
                                    isFinished: false,
                                    currentPage: nextPagePull,
                                    items,
                                    additionData
                                }
                            });
                        }
                    },
                    (error) => {
                        return reject(error);
                    }
                );
        });
    }

    async getDataFromLocalDB(entitiesCodes: string[]): Promise<GeneralMessage> {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {};
                let db   = this.databaseManager.getDbInstance();

                let entityCode;

                for (let i = 0; i < entitiesCodes.length; i++) {
                    let items              = await db[entitiesCodes[i]].toArray();
                    let entityInfo         = await this.getEntityDataInformation(entitiesCodes[i]);
                    data[entitiesCodes[i]] = {
                        items,
                        ...JSON.parse(JSON.stringify(entityInfo)),
                        entityCode: entitiesCodes[i]
                    };
                }
                return resolve({data});
            } catch (e) {
                return reject(e);
            }
        });
    }

    async getProductFilteredBySetting(productsEntity: Entity, retailConfigEntity: Entity, settingEntity: Entity): Promise<GeneralMessage> {
        return new Promise((resolve) => {
            const products     = productsEntity.items;
            let productsFiltered: any;
            let retailConfig   = retailConfigEntity.items.find((v) => v['key'] === 'pos');
            let productSetting = settingEntity.items.find((v) => v['key'] === 'product');

            retailConfig   = retailConfig ? retailConfig['value'] : {};
            productSetting = productSetting ? productSetting['value'] : {};

            let visibility: any     = true;
            let type: any           = true;
            let sort: any           = true;
            let isSortAsc: any      = true;
            let showOutOfStock: any = true;
            let showDisabled: any   = true;

            if (retailConfig.hasOwnProperty('xretail/pos/show_product_by_visibility')) {
                visibility = retailConfig['xretail/pos/show_product_by_visibility'];
            }
            if (retailConfig.hasOwnProperty('xretail/pos/show_product_by_type')) {
                type = retailConfig['xretail/pos/show_product_by_type'];
            }
            if (retailConfig.hasOwnProperty('xretail/pos/sort_product_base_on')) {
                sort = retailConfig['xretail/pos/sort_product_base_on'];
            }
            if (retailConfig.hasOwnProperty('xretail/pos/sort_product_sorting')) {
                isSortAsc = retailConfig['xretail/pos/sort_product_sorting'];
            }
            if (retailConfig.hasOwnProperty('xretail/pos/show_outofstock_product')) {
                showOutOfStock = retailConfig['xretail/pos/show_outofstock_product'];
            }
            if (retailConfig.hasOwnProperty('xretail/pos/show_disable_product')) {
                showDisabled = retailConfig['xretail/pos/show_disable_product'];
            }
            productsFiltered = products.filter((product: ProductDB) => {
                if (product.getData('id') === productSetting['custom_sale_product_id']) {
                    return false;
                }

                // load visibility
                if (visibility !== true) {
                    if (_.indexOf(visibility, product.getData('visibility')) === -1) {
                        return false;
                    }
                }
                if (type !== true) {
                    if (_.indexOf(type, product.getData('type_id')) === -1) {
                        return false;
                    }
                }
                // FiX XRT-187 : show out of stock product
                if (parseInt(showOutOfStock) !== 1 || _.isNull(showOutOfStock)) {
                    if (parseInt(product['stock_items']['is_in_stock']) === 0) {
                        return false;
                    }
                }
                // Fix XRT-185: filter disabled product
                if (parseInt(showDisabled) !== 1) {
                    if (product.getData('status') === "2") {
                        return false;
                    }
                }
                return true;
            });

            if (sort !== true) {
                productsFiltered = productsFiltered.sortBy((product) => {
                    if (sort === 'price' || sort === 'id') {
                        return parseFloat(product.getData(sort));
                    } else {
                        // FIx 192 : get lower case to sort product by name , sku
                        return _.toLower(product.getData(sort));
                    }
                });
                if (isSortAsc !== 'asc') {
                    //noinspection TypeScriptUnresolvedFunction
                    productsFiltered = productsFiltered.reverse();
                }
            }

            return resolve({data: {productsFiltered}});
        });
    }

}
