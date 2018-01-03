// application root reducer
import {createReducer} from "../src/redux/reducer";

// Initial application state
export const initialState = createReducer(null, {})[0];

// Run an action through all reducers
export const dispatch = (state, action) => createReducer(state, action);
