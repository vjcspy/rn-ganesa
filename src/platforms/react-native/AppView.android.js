import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, StatusBar, BackHandler} from "react-native";
import NavigatorViewContainer from "./native-base/navigator/NavigatorViewContainer";
import DeveloperMenu from "./modules/core/components/DeveloperMenu";

import {NavigationActions} from "react-navigation";
import {store} from "../../framework/redux/store";

class AppView extends Component {
  static displayName = "AppView";
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  
  navigateBack() {
    const navigatorState = store.getState().get("navigatorState");
    
    const currentStackScreen = navigatorState.get("index");
    const currentTab         = navigatorState.getIn(["routes", 0, "index"]);
    
    if (currentTab !== 0 || currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }
    
    // otherwise let OS handle the back button action
    return false;
  }
  
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.navigateBack);
  }
  
  componentDidMount() {
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='#455a64' barStyle='light-content'/>
        <NavigatorViewContainer/>
        {__DEV__ && <DeveloperMenu/>}
      </View>
    );
  }
}

export default AppView;
