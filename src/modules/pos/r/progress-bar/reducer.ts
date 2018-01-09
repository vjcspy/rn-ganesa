import {ProgressActions} from "./actions";
import {progressStateFactory, ProgressStateRecord} from "./state";
import {Reducer} from "redux";

export const progressBarReducer: Reducer<ProgressStateRecord> = (state = progressStateFactory(), action) => {
    switch (action.type) {
        case ProgressActions.ACTION_UPDATE_PROGRESS_BAR:
            return state.set('value', action.payload['value']);
        case ProgressActions.ACTION_RESET_PROGRESS_BAR:
            return progressStateFactory();
    }
    return state;
};
