import {makeRecordFactory} from "../../../../utils/record-factory";
import {ACTION_RESET_PROGRESS_BAR, ACTION_UPDATE_PROGRESS_BAR} from "./actions";

const initState = makeRecordFactory({
                                        value: 0,
                                        duration: 100
                                    });

export const progressBarReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_UPDATE_PROGRESS_BAR:
            return state.set('value', action.payload['value']);
        case ACTION_RESET_PROGRESS_BAR:
            return initState;
    }
    return state;
};
