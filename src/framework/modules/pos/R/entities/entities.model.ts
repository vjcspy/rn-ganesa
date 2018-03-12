import {List} from "immutable";
import {makeTypedFactory, TypedRecord} from "typed-immutable-record";

export interface Entity {
    items: List<any>;
    currentPage: number;
    query?: string;
    propertyFilter?: Object;
    pageSize: number;
    entityCode: string;
    apiUrlCode: string;
    entityPrimaryKey?: string;
    isFinished: boolean;
    isDependStore: boolean;
    needRealTime?: boolean;
    isLoadedFromDB?: boolean;
    proportion?: number;
    itemFiltered?: List<any>;
    limitPage?: number;
    additionData?: {
        lastPageNumber?: number;
        totalCount?: number;
        isLoadFromCache?: boolean;
    };
}

export interface EntityRecord extends TypedRecord<EntityRecord>, Entity {}

export const entityFactory       = makeTypedFactory<Entity, EntityRecord>({
    items: List.of(),
    currentPage: 0,
    query: "",
    propertyFilter: {},
    pageSize: 100,
    entityCode: null,
    apiUrlCode: null,
    entityPrimaryKey: 'id',
    isFinished: false,
    isDependStore: false,
    needRealTime: false,
    isLoadedFromDB: false,
    proportion: 1,
    itemFiltered: List.of(),
    limitPage: 0,
    additionData: {}
});

