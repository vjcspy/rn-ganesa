import {createReducer} from "../../../framework/redux/reducer";
import {progressBarReducer} from "./progress-bar/reducer";

export const posReducer = createReducer({
                                            progressBar: progressBarReducer
                                        });


