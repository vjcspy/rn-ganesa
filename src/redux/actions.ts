//import {bindActionCreators} from "redux";

//export const actionCreators = (actions, dispatch) => bindActionCreators(actions, dispatch);

export const ACTION_APP_DID_MOUNT = "ACTION_APP_DID_MOUNT";

export const actionAppDidMount = () => ({
  type   : ACTION_APP_DID_MOUNT,
  payload: {}
});
