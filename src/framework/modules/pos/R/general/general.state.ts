import {makeTypedFactory, TypedRecord} from "typed-immutable-record";
import {List} from "immutable";

export interface PosGeneralState {
    baseUrl: string;
    urls: List<any>;
    store: Object;
    register: Object;
    warehouse: Object;
    outlet: Object;
    user: Object;
    redirect: string;
}

export interface PosGeneralStateRecord extends TypedRecord<PosGeneralStateRecord>, PosGeneralState {
}

export const posGeneralStateFactory = makeTypedFactory<PosGeneralState, PosGeneralStateRecord>({
    baseUrl: "http://xpos.ispx.smartosc.com",
    urls: List.of(),
    store: {
        id: 1
    },
    register: {
        id: 1
    },
    warehouse: null,
    outlet: {
        id: 1
    },
    user: null,
    redirect: 'checkout'
});
