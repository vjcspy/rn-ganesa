import React, {Component} from "react";
import {View, Animated, StatusBar} from "react-native";
import {connect} from "react-redux";
import {outletRegisterStyles} from "../../styles/outlet-register";
import {Label} from "native-base";
import {translate} from "../../../../i18n/i18n";
import {firebase} from "react-native-firebase";

class PosLoginView extends Component {
  state = {};
  
  render() {
    return (
      <View style={outletRegisterStyles.container}>
        <View style={outletRegisterStyles.textHeader}>
          <Label>{translate("greeting")}</Label>
        </View>
      </View>
    );
  }
}

export const PosLoginViewContainer = connect()(PosLoginView);
