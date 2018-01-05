import {createReducer} from "../../../redux/reducer";
import {authStateReducer} from "./reducer";
import {replaceModuleReducer} from "../../../redux/store";

const authModuleReducer = createReducer({
                                          auth: authStateReducer
                                        });

export const replaceAuthModuleReducer = () => {
  replaceModuleReducer("auth", authModuleReducer);
};

