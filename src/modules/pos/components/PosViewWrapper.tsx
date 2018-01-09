import * as React from "react";
import {View} from "react-native";
import {ProgressBarContainer} from "./partials/ProgressBar";
import {PosStatusBar} from "./partials/StatusBar";

export class PosViewWrapper extends React.Component<any, any> {
    state = {
        progress: 0
    };
    
    renderChildren() {
        let childrens = [];
        childrens.push(this.props.children);
        return childrens;
    }
    
    render() {
        return <View>
            <PosStatusBar/>
            <ProgressBarContainer/>
            <View>
                {this.renderChildren()}
            </View>
        </View>
    }
}

