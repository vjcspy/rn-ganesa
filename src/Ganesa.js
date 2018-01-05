import {Provider} from "react-redux";
import store from "../src/redux/store";
import AppViewContainer from "../src/modules/AppViewContainer";

import React, {Component} from "react";

import {StyleProvider, Root} from "native-base";
import getTheme from "../src/native-base-theme/components";
import variables from "../src/native-base-theme/variables/commonColor";
import "./vendor";

export default class Ganesa extends Component {
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
