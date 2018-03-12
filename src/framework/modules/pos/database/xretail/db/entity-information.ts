import {Timezone} from "../../../core/framework/General/DateTime/Timezone";
import {DataObject} from "../../../core/framework/General/DataObject";

export class EntityInformation extends DataObject {
    id: string;
    storeId: number;
    currentPage: number;
    pageSize: number;
    isFinished: boolean;
    cache_time: number;
    base_url: string;
    additionData: Object;
    createdAt: string;
    updatedAt: string;

    static getFields(): string {
        return "id,storeId,currentPage,pageSize,isFinished,base_url,additionData,createdAt,updatedAt";
    }

    static getCode(): string {
        return "entityInformation";
    }
}
