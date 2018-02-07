import * as React from "react";
import {View, Animated, Dimensions} from "react-native";
import {connect} from "react-redux";
import {Spinner} from 'native-base';
import {getStatusBarHeight} from "../../ultils/native/status-bar";
import {PosStyleVariable} from "../../styles/variable";

// const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


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
        return this.props.progressBar.value > 0 && this.props.progressBar.value <= 1;
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
            position: "absolute",
            top: getStatusBarHeight(),
            width: deviceWidth
        }}>
            <View style={{flex: 1}}>
                {this.isShowProgress() && (
                    <View>
                        <Spinner color={PosStyleVariable.spinnerColor}/>
                        <Animated.View
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: widthInterpolated,
                                backgroundColor: barColor,
                                height,
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    }
}

ProgressBar['defaultProps'] = {
    height: PosStyleVariable.progressBarHeight,
    barColor: PosStyleVariable.progressBarColor,
};

export const ProgressBarContainer: any = connect(
    state => ({
        progressBar: state['progressBar']
    })
)(ProgressBar);
