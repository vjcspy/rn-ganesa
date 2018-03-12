import {connect} from "react-redux";
import AppView from "./AppView";

export default connect(
  () => ({}),
  dispatch => ({dispatch})
)(AppView);
