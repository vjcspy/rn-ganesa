import {createReducer} from "../../../redux/reducer";
import {AccountActions} from "./actions";
import {accountStateRecordFactory} from "./state";

function accountStateReducer(state = accountStateRecordFactory(), action) {
    switch (action.type) {
        case AccountActions.ACTION_SAVE_USER:
            return state.set("user", action.payload.user);

        default:
            return state;
    }
}

export const accountModuleReducer = createReducer({
    account: accountStateReducer
});
