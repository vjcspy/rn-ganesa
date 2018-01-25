import {makeTypedFactory, TypedRecord} from "typed-immutable-record";

export interface CoreState {}

export interface CoreStateRecord extends TypedRecord<any>, CoreState {}

export const coreStateFactory = makeTypedFactory<CoreState, CoreStateRecord>(
    {}
);
