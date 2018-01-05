import {connect} from "react-redux";
import AppView from "./AppView";
import {authModuleBoot} from "./auth/module";

authModuleBoot();

export default connect(
  state => {
    return ({
      isReady: state["session"].get("isReady")
    });
  }
)(AppView);
