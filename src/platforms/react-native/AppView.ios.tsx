import * as React from "react";
import {View} from "react-native";
import {app} from "../../framework/general/app";
import {CoreActions} from "./modules/core/R/actions";
import {NavigatorViewContainer} from "./modules/routes/components/NavigatorView";
import DeveloperMenu from "./modules/core/components/DeveloperMenu";

class AppView extends React.Component {
    static displayName = "AppView";

    componentDidMount() {
        app().resolve<CoreActions>(CoreActions).appDidMount();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorViewContainer/>
                {__DEV__ && <DeveloperMenu/>}
            </View>
        );
    }
}

export default AppView;
