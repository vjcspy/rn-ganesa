import {makeRecordFactory} from "../../../utils/record-factory";

const initState = makeRecordFactory({});

export default function authStateReducer(state = initState, action) {
  return state;
}

