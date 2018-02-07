import {EntityInformation} from "../../../../../../framework/modules/pos/database/xretail/db/entity-information";
import {AbstractEntityRealmDatabase} from "../../../../realm";

export class EntityInformationRealm extends AbstractEntityRealmDatabase {
    config = {
        name: EntityInformation.getCode(),
        primaryKey: "id",
        properties: {
            id: "string",
            storeId: "int?",
            currentPage: "int",
            pageSize: "int",
            isFinished: "bool",
            cache_time: "int?",
            base_url: "string",
            additionData: {
                type: "string",
                optional: true,
                json: true
            },
            createdAt: "string?",
            updatedAt: "string?",
        }
    };
}