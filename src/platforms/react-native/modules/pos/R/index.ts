import {progressBarReducer} from "./progress-bar/reducer";
import {createReducer} from "../../../../../framework/redux/reducer";

export const posReducer = createReducer({
    progressBar: progressBarReducer
});


