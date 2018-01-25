import {NavigationActions} from "react-navigation";
import {makeRecordFactory} from "../../../utils/record-factory";
import AppNavigator from "./Navigator";
import * as _ from "lodash";

export function NavigatorReducer(state, action) {
    // Initial state
    if (!state) {
        let initState = AppNavigator.router.getStateForAction(action, state);
        return makeRecordFactory(initState);
    }

    // Is this a navigation action that we should act upon?
    if (_.includes(NavigationActions, action.type)) {
        return makeRecordFactory(AppNavigator.router.getStateForAction(action, state.toJS()));
    }

    return state;
}
