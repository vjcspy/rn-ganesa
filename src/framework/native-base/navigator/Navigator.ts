import {DrawerNavigator, StackNavigator} from "react-navigation";

//import CounterViewContainer from "../counter/CounterViewContainer";
//import ColorViewContainer from "../colors/ColorViewContainer";
// import {PosOutletViewContainer} from "../../../modules/pos/pages/outlet-register/Outlet";
import {AuthLoginContainer} from "../../../modules/auth/pages/Login";

const headerColor = "white";

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = DrawerNavigator({
                                                       // Outlet: {
                                                       //     screen: PosOutletViewContainer
                                                       // },
                                                       Login: {
                                                           screen: AuthLoginContainer
                                                       },
                                                       //Counter: {
                                                       //  screen: CounterViewContainer
                                                       //},
                                                       //Color  : {
                                                       //  screen: ColorViewContainer
                                                       //}
                                                   });

MainScreenNavigator.navigationOptions = {
    headerTitleStyle: {color: "blue"},
    headerStyle: {
        backgroundColor: headerColor,
        elevation: 0 // disable header elevation when TabNavigator visible
    }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
                                        Home: {screen: MainScreenNavigator},
                                        //InfiniteColorStack: {screen: ColorViewContainer}
                                    }, {
                                        headerMode: "none"
                                    });

export default AppNavigator;