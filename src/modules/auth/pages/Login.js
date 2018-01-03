import React, {Component} from "react";
import {TextInput, View, Animated, Button, StyleSheet} from "react-native";
import BackgroundWrapper from "../../../components/partials/BackgroundWrapper";
import {getPlatformValue} from "../../../utils/platform";
import Icon from "react-native-vector-icons/FontAwesome";
import background from "../../../images/ec-background.jpeg";

class AuthLoginView extends Component {
  state = {
    username : "",
    password : "",
    animation: {
      usernamePostionLeft : new Animated.Value(795),
      passwordPositionLeft: new Animated.Value(905),
      loginPositionTop    : new Animated.Value(1402),
      statusPositionTop   : new Animated.Value(1542)
    }
  };
  
  handlePressSignIn = () => {
  
  };
  
  componentDidMount() {
    const timing = Animated.timing;
    Animated.parallel([
                        timing(this.state.animation.usernamePostionLeft, {
                          toValue : 0,
                          duration: 700
                        }),
                        timing(this.state.animation.passwordPositionLeft, {
                          toValue : 0,
                          duration: 900
                        }),
                        timing(this.state.animation.loginPositionTop, {
                          toValue : 0,
                          duration: 700
                        }),
                        timing(this.state.animation.statusPositionTop, {
                          toValue : 0,
                          duration: 700
                        })
    
                      ]).start();
  }
  
  render() {
    return (
      <BackgroundWrapper background={background}>
        <View style={accountStyle.loginContainer}>
          <View style={accountStyle.formContainer}>
            <Animated.View style={{position: "relative", left: this.state.animation.usernamePostionLeft}}>
              <TextInput label="Username"
                         icon={<Icon name="user"/>}
                         value={this.state.username}
                         onChangeText={(username) => this.setState({username})}
              />
            </Animated.View>
            <Animated.View style={{position: "relative", left: this.state.animation.passwordPositionLeft}}>
              <TextInput label="Password"
                         style={{height: 40, borderColor: "gray", borderWidth: 1}}
                         icon={<Icon name="key"/>}
                         value={this.state.password}
                         marginTop={23}
                         onChangeText={(password) => this.setState({password})}
                         secureTextEntry
              />
            </Animated.View>
            <Animated.View style={{position: "relative", top: this.state.animation.loginPositionTop}}>
              <Button marginTop={60} onPress={this.handlePressSignIn.bind(this)} title=" Sign in"/>
            </Animated.View>
          </View>
        </View>
      </BackgroundWrapper>
    );
  }
}

const accountStyle = StyleSheet.create({
                                         loginContainer: {
                                           flex           : 1,
                                           flexDirection  : "row",
                                           backgroundColor: "transparent",
                                           paddingTop     : 49
                                         },
                                         formContainer : {
                                           flex        : 1,
                                           paddingLeft : 15,
                                           paddingRight: 15,
                                           marginTop   : getPlatformValue("android", 25, 45)
                                         }
                                       });

export default AuthLoginView;
