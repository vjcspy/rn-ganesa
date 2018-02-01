import {ModuleManager} from "../../framework/general/module-manager";
import {store} from "../../framework/redux/store";
import {AppRegistry} from "react-native";
import * as React from "react";
import {StyleProvider, Root} from "native-base";
import {Provider} from "react-redux";
import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import AppViewContainer from "./AppViewContainer";
import {frameworkBootstrap} from "../../framework/bootstrap";
import {CoreModule} from "./modules/core/module";
import {RoutesModule} from "./modules/routes/module";
import {AccountModule} from "./modules/account/module";
import {PosModule} from "./modules/pos/module";

frameworkBootstrap();

ModuleManager.boot([
    CoreModule,
    RoutesModule,
    AccountModule,
    PosModule,
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