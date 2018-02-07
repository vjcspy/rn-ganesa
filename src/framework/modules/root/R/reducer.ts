import {RootActions} from "./actions";
import {Action, ActionReducer} from "../../../redux-observable/typing";
import {RootState, rootStateFactory, RootStateRecord} from "./state";

export const rootReducer: ActionReducer<RootState> = (state: RootStateRecord = rootStateFactory(), action: Action) => {
    switch (action.type) {
        case RootActions.UPDATE_NETWORK_STATUS:
            return state.set('online', action.payload['online']);

        default:
            return state;
    }
};
