import {connect} from "react-redux";
import AppView from "./AppView";
import {boot} from "./modules";

boot();

export default connect(
  state => {
    return ({
      isReady: state["session"].get("isReady")
    });
  }
)(AppView);
