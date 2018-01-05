import {makeRecordFactory} from "../../../utils/record-factory";

const initState = makeRecordFactory({
                                      user: null
                                    });

export function authStateReducer(state = initState, action) {
  return state;
}

