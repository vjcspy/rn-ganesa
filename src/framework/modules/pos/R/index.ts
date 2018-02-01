import {progressBarReducer} from "./progress-bar/reducer";
import {createReducer} from "../../../redux/reducer";

export const posReducer = createReducer({
    progressBar: progressBarReducer
});


