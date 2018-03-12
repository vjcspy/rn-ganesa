import {makeTypedFactory, TypedRecord} from "typed-immutable-record";

export interface AccountState {
    user: any;
}

export interface AccountStateRecord extends TypedRecord<any>, AccountState {
}

export const accountStateRecordFactory = makeTypedFactory<AccountState, AccountStateRecord>(
    {
        user: null
    }
);
