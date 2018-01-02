import {NavigationActions} from "react-navigation";
import includes from "lodash/includes";

import AppNavigator from "./Navigator";
import {makeRecordFactory} from "../../utils/record-factory";

export default function NavigatorReducer(state, action) {
  // Initial state
  if (!state) {
    return makeRecordFactory(AppNavigator.router.getStateForAction(action, state));
  }
  
  // Is this a navigation action that we should act upon?
  if (includes(NavigationActions, action.type)) {
    return makeRecordFactory(AppNavigator.router.getStateForAction(action, state.toJS()));
  }
  
  return state;
}
