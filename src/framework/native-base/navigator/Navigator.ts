import {DrawerNavigator, StackNavigator} from "react-navigation";

//import CounterViewContainer from "../counter/CounterViewContainer";
//import ColorViewContainer from "../colors/ColorViewContainer";
import {AuthLoginContainer} from "../../../modules/auth/pages/Login";
import {PosOutletViewContainer} from "../../../modules/pos/pages/outlet-register/Outlet";

// const headerColor = "white";

// TabNavigator is nested inside StackNavigator
// export const MainScreenNavigator = DrawerNavigator({
//                                                        // Outlet: {
//                                                        //     screen: PosOutletViewContainer
//                                                        // },
//                                                        Login: {
//                                                            screen: AuthLoginContainer
//                                                        },
//                                                        //Counter: {
//                                                        //  screen: CounterViewContainer
//                                                        //},
//                                                        //Color  : {
//                                                        //  screen: ColorViewContainer
//                                                        //}
//                                                    });
//
// MainScreenNavigator.navigationOptions = {
//     headerTitleStyle: {color: "blue"},
//     headerStyle: {
//         backgroundColor: headerColor,
//         elevation: 0 // disable header elevation when TabNavigator visible
//     }
// };

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
                                        login: {screen: AuthLoginContainer},
                                        outlet: {screen: PosOutletViewContainer}
                                        //InfiniteColorStack: {screen: ColorViewContainer}
                                    }, {
                                        headerMode: "none"
                                    });

export default AppNavigator;
