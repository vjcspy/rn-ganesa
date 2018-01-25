import {NavigationActions} from "react-navigation";
import {makeRecordFactory} from "../../../utils/record-factory";
import * as _ from "lodash";
import AppNavigator from "../components/Navigator";
import {createReducer} from "../../../framework/redux/reducer";

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

export const routesModuleReducer = createReducer({
    navigatorState: NavigatorReducer,
});
