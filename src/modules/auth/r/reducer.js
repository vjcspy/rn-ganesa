import {makeRecordFactory} from "../../../utils/record-factory";
import {createReducer} from "../../../redux/reducer";

const initState = makeRecordFactory({
                                      user: null
                                    });

function authStateReducer(state = initState, action) {
  return state;
}

export const authModuleReducer = createReducer({
                                                 auth: authStateReducer
                                               });
