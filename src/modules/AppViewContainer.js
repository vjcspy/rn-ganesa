import {connect} from "react-redux";
import AppView from "./AppView";
import "./index";

export default connect(
  () => ({}),
  dispatch => ({dispatch})
)(AppView);
