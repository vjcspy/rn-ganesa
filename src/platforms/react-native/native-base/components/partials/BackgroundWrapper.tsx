import * as React from "react";
import * as PropTypes from "prop-types";
import {View, Image} from "react-native";

export default class BackgroundWrapper extends React.Component<any, any> {
    renderChildren() {
        let childrens = [];
        childrens.push(this.props["children"]);
        return childrens;
    }
    
    renderViewBackground() {
        const style = [
            styleWrapper.containerView,
        ];
        return <View style={{flex: 1}}>
            <Image style={{
                flex: 1,
                resizeMode: "stretch",
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                opacity: 0.8
            }} source={this.props["background"]}/>
            
            <View style={{
                backgroundColor: "black",
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                opacity: 0.6
            }}/>
            
            <View style={style}>
                {this.renderChildren()}
            </View>
        </View>;
    }
    
    render() {
        return this.renderViewBackground();
    }
}

BackgroundWrapper["propTypes"] = {
    children: PropTypes.any,
    iconLeft: PropTypes.string,
    onPressIcon: PropTypes.func,
    paddingTop: PropTypes.number,
    background: PropTypes.any
};

const styleWrapper = {
    containerView: {
        flex: 1
    },
    icon: {
        marginLeft: 10,
        position: "relative",
        top: 6,
        opacity: .8,
        backgroundColor: "transparent"
    }
};
