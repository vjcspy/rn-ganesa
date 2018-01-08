import {Provider} from "react-redux";
import store from "./redux/store";
import AppViewContainer from "./modules/AppViewContainer";

import React, {Component} from "react";

import {StyleProvider, Root} from "native-base";
import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import "./vendor";
import {AppRegistry} from "react-native";

class Ganesa extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          {/*<Root>*/}
          <AppViewContainer/>
          {/*</Root>*/}
        </Provider>
      </StyleProvider>
    );
  }
}

AppRegistry.registerComponent("Ganesa", () => Ganesa);
