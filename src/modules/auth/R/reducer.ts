import {createReducer} from "../../../framework/redux/reducer";
import {AuthActions} from "./actions";
import {authStateRecordFactory} from "./state";

function authStateReducer(state = authStateRecordFactory(), action) {
    switch (action.type) {
        case AuthActions.ACTION_SAVE_USER:
            return state.set("user", action.payload.user);
        
        default:
            return state;
    }
}

export const authModuleReducer = createReducer({
                                                   auth: authStateReducer
                                               });
