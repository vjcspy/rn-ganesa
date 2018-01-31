import {makeTypedFactory, TypedRecord} from "typed-immutable-record";

export interface AuthState {
    user: any;
}

export interface AuthStateRecord extends TypedRecord<any>, AuthState {}

export const authStateRecordFactory = makeTypedFactory<AuthState, AuthStateRecord>(
    {
        user: null
    }
);
