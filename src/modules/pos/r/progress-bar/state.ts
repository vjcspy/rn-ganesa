import {makeTypedFactory, TypedRecord} from "typed-immutable-record";

export interface ProgressState {
    value: number;
    duration: number;
}

export interface ProgressStateRecord extends TypedRecord<any>, ProgressState {}

export const progressStateFactory = makeTypedFactory<ProgressState, ProgressStateRecord>(
    {
        value: 0,
        duration: 100
    }
);
