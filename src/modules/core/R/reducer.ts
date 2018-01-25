import {coreStateFactory} from "./state";

export const coreReducer = (state = coreStateFactory(), action) => {
    return state;
}