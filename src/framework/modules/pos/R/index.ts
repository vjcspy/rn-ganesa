import {progressBarReducer} from "./progress-bar/reducer";
import {createReducer} from "../../../redux/reducer";
import {generalReducer} from "./general/general.reducer";
import {entitiesReducer} from "./entities/entities.reducer";
import {pullReducer} from "./entities/pull.reducer";

export const posReducer = createReducer({
    progressBar: progressBarReducer,
    general: generalReducer,
    entities: entitiesReducer,
    pull: pullReducer,
});


