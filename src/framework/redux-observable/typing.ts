export interface Action {
    type: string;
    payload: any;
}

export type ActionReducer<T> = (state: T, action: Action) => T;