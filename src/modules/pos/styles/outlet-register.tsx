import {Dimensions, StyleSheet} from "react-native";
import {StyleDebug} from "../../../styles/debug";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth  = Dimensions.get("window").width;

const style = {
  container        : {
    flex        : 1,
    marginTop   : 67,
    marginBottom: 67
  },
  outletForm       : {
    flex         : 1,
    flexDirection: "row",
  },
  textHeader       : {
    alignItems: "center"
  },
  registerContainer: {
    marginTop: 30,
    ...StyleDebug.view()
  }
};

export const outletRegisterStyles = StyleSheet.create(style);
