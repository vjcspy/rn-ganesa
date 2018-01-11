import {connect} from "react-redux";
import AppView from "./AppView";
import {boot} from "./modules";

// Boot all module
boot();

export default connect(
  () => ({}),
  dispatch => ({dispatch})
)(AppView);
