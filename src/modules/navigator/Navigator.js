import {DrawerNavigator, StackNavigator} from "react-navigation";

import CounterViewContainer from "../counter/CounterViewContainer";
import ColorViewContainer from "../colors/ColorViewContainer";

const headerColor = "white";

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = DrawerNavigator({
                                                     Counter: {
                                                       screen           : CounterViewContainer,
                                                       navigationOptions: {
                                                         headerTitle: "Ganesa"
                                                       }
                                                     },
                                                     Color  : {
                                                       screen           : ColorViewContainer,
                                                       navigationOptions: {
                                                         headerTitle: "Color"
                                                       }
                                                     }
                                                   });

MainScreenNavigator.navigationOptions = {
  headerTitleStyle: {color: "blue"},
  headerStyle     : {
    backgroundColor: headerColor,
    elevation      : 0 // disable header elevation when TabNavigator visible
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
                                      Home              : {screen: MainScreenNavigator},
                                      InfiniteColorStack: {screen: ColorViewContainer}
                                    });

export default AppNavigator;
