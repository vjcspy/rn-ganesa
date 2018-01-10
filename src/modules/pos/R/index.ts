import {createReducer} from "../../../redux/reducer";
import {progressBarReducer} from "./progress-bar/reducer";
import {EffectsModule} from "../../../redux/observable/effect";
import {ProgressBarEffect} from "./progress-bar/effects";

export const posReducer = createReducer({
                                            progressBar: progressBarReducer
                                        });

EffectsModule.run(new ProgressBarEffect());
