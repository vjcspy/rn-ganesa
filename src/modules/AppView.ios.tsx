import * as React from "react";
import {View} from "react-native";
import DeveloperMenu from "../framework/native-base/components/DeveloperMenu";
import {NavigatorViewContainer} from "../framework/native-base/navigator/NavigatorView";
import {app} from "../framework/general/app";
import {CoreActions} from "./core/R/actions";

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
