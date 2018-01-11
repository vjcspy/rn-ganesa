import * as React from "react";
import {View} from "react-native";
import DeveloperMenu from "../framework/native-base/components/DeveloperMenu";
import {NavigatorViewContainer} from "../framework/native-base/navigator/NavigatorView";

class AppView extends React.Component {
    static displayName = "AppView";
    
    componentDidMount() {
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
