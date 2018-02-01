import * as React from "react";
import {StatusBar, View} from "react-native";
import {getStatusBarHeight} from "../../ultils/native/status-bar";
import {PosStyleVariable} from "../../styles/variable";

export class PosStatusBar extends React.Component {
    render() {
        return <View style={{backgroundColor: PosStyleVariable.statusBarColor, height: getStatusBarHeight()}}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={true} backgroundColor={PosStyleVariable.statusBarColor}/>
        </View>
    }
}
