import {AuthModule} from "./auth/module";
import {PosModule} from "./pos/module";
import {ModuleManager} from "../../framework/general/module-manager";
import {RoutesModule} from "./routes/module";
import {CoreModule} from "./core/module";
import {store} from "../../framework/redux/store";
import {AppRegistry} from "react-native";
import * as React from "react";
import {StyleProvider, Root} from "native-base";
import {Provider} from "react-redux";
import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import AppViewContainer from "./AppViewContainer";

ModuleManager.boot([
    CoreModule,
    AuthModule,
    PosModule,
    RoutesModule
]);


class Ganesa extends React.Component<any, any> {
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