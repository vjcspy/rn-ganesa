import {StackNavigator} from "react-navigation";
import {AuthLoginContainer} from "../../account/pages/Login";
import {PosOutletViewContainer} from "../../pos/pages/outlet-register/Outlet";

const AppNavigator = StackNavigator({
    login: {screen: AuthLoginContainer},
    outlet: {screen: PosOutletViewContainer}
}, {
    headerMode: "none"
});

export default AppNavigator;
