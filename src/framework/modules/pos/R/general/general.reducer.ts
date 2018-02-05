import * as _ from 'lodash';
import {Action, ActionReducer} from "../../../../redux-observable/typing";
import {posGeneralStateFactory, PosGeneralStateRecord} from "./general.state";
import {PosGeneralActions} from "./general.actions";
import {AccountActions} from "../../../account/R/actions";

export const generalReducer: ActionReducer<PosGeneralStateRecord> = (state: PosGeneralStateRecord = posGeneralStateFactory(), action: Action) => {
    switch (action.type) {
        case PosGeneralActions.ACTION_SAVE_STATE:
            _.forEach(action.payload['generalData'], (v, k: any) => {
                state = state.set(k, v);
            });
            return state;

        case PosGeneralActions.ACTION_GO_OUTLET_REGISTER_PAGE:
            return state.set('redirect', action.payload['redirect']);

        case PosGeneralActions.ACTION_SELECT_WEBSITE:
            return state.set('baseUrl', action.payload['baseUrl']);

        case PosGeneralActions.ACTION_RESOLVED_URLS:
            return state.set('urls', action.payload['urls']);

        case AccountActions.ACTION_LOGOUT:
        case PosGeneralActions.ACTION_CLEAR_GENERAL_DATA:
            return posGeneralStateFactory();

        default:
            return state;
    }
};
