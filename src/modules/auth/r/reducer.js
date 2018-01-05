import {makeRecordFactory} from "../../../utils/record-factory";
import {createReducer} from "../../../redux/reducer";
import {ACTION_SAVE_USER} from "./actions";

const initState = makeRecordFactory({
                                      user: null
                                    });

function authStateReducer(state = initState, action) {
  switch (action.type) {
    case ACTION_SAVE_USER:
      return state.set("user", action.payload.user);
    
    default:
      return state;
  }
}

export const authModuleReducer = createReducer({
                                                 auth: authStateReducer
                                               });
