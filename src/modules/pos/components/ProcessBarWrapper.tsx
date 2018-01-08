import * as React from "react";
import {View, Animated, Dimensions} from "react-native";
import {connect} from "react-redux";
import {Container, Header, Content, Spinner} from 'native-base';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth  = Dimensions.get("window").width;

class ProgressBar extends React.Component<any, any> {
    animation: Animated.Value;
    
    componentWillMount() {
        this.animation = new Animated.Value(this.props.progressBar.value);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.progressBar.value !== this.props.progressBar.value) {
            Animated.timing(this.animation, {
                toValue: this.props.progressBar.value,
                duration: this.props.progressBar.duration
            }).start();
        }
    }
    
    protected isShowProgress(): boolean {
        return this.props.progressBar.value > 0 && this.props.progressBar.value < 1;
    }
    
    render() {
        const {height, barColor,} = this.props;
        const widthInterpolated   = this.animation.interpolate({
                                                                   inputRange: [0, 1],
                                                                   outputRange: ["0%", "100%"],
                                                                   extrapolate: "clamp"
                                                               });
        return <View style={{
            flexDirection: "row",
            height,
            position: "absolute",
            top: deviceHeight - height,
            width: deviceWidth
        }}>
            <View style={{flex: 1}}>
                {this.isShowProgress() && (
                    <View>
                        <Spinner/>
                        <Animated.View
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: widthInterpolated,
                                backgroundColor: barColor
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    }
}

ProgressBar['defaultProps'] = {
    height: 5,
    barColor: "#3258bb",
};

const ProgressBarContainer: any = connect(
    state => ({
        progressBar: state['progressBar']
    })
)(ProgressBar);

export class ProcessBarWrapper extends React.Component<any, any> {
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
            <ProgressBarContainer/>
            <View>
                {this.renderChildren()}
            </View>
        </View>
    }
}

