import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Animated} from "react-native";
import BackgroundWrapper from "../../../components/partials/BackgroundWrapper";
import Icon from "react-native-vector-icons/FontAwesome";
import background from "../../../images/ec-background.jpeg";
import {Button, Text, Item, Input, Label} from "native-base";
import accountStyle from "../styles/account";
import firebase from "react-native-firebase";

class AuthLoginView extends Component {
  state = {
    email    : "",
    password : "",
    animation: {
      usernamePostionLeft : new Animated.Value(795),
      passwordPositionLeft: new Animated.Value(905),
      loginPositionTop    : new Animated.Value(1402),
      statusPositionTop   : new Animated.Value(1542)
    }
  };
  
  handlePressSignIn = async () => {
    const user = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    console.log(user);
  };
  
  constructor(prop) {
    super(prop);
  }
  
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
          <View style={accountStyle.formContent}>
            
            {/*social login*/}
            <View style={accountStyle.socialLoginContent}>
              <Button iconLeft style={accountStyle.socialButton} danger>
                <Icon name="google" style={accountStyle.buttonIcon}/>
                <Text>Sign in with Google+</Text>
              </Button>
              <Button iconLeft style={accountStyle.socialButton}>
                <Icon name="facebook-official" style={accountStyle.buttonIcon}/>
                <Text>Sign in with Facebook</Text>
              </Button>
              <Text style={accountStyle.socialTextSignin}>Or sign in with your account!</Text>
            </View>
            
            {/*account login*/}
            <View style={accountStyle.accountContent}>
              <View>
                <Animated.View
                  style={{position: "relative", left: this.state.animation.usernamePostionLeft}}>
                  <Item style={accountStyle.textInputEmail} fixedLabel>
                    <Label>Email</Label>
                    <Input onChangeText={(email) => {this.setState({email});}} keyboardType="email-address" autoCorrect={false} autoCapitalize="none"/>
                  </Item>
                </Animated.View>
                <Animated.View
                  style={{position: "relative", left: this.state.animation.passwordPositionLeft}}>
                  <Item style={accountStyle.textInputPassword} fixedLabel>
                    <Label>Password</Label>
                    <Input onChangeText={(password) => {this.setState({password});}} secureTextEntry={true} autoCorrect={false} autoCapitalize="none"/>
                  </Item>
                </Animated.View>
                <Animated.View style={{position: "relative", top: this.state.animation.loginPositionTop}}>
                </Animated.View>
              </View>
              
              <View style={accountStyle.accountContentButtonContainer}>
                <View style={{flex: 0.5}}>
                  <Button light style={accountStyle.accountContentButton}>
                    <Text style={accountStyle.accountContentTextButton}>Cancel </Text>
                  </Button>
                </View>
                <View style={{flex: 0.03}}/>
                <View style={{flex: 0.5}}>
                  <Button light style={accountStyle.accountContentButton} onPress={this.handlePressSignIn}>
                    <Text style={accountStyle.accountContentTextButton}> Done </Text>
                  </Button>
                </View>
              </View>
              
              <View style={accountStyle.forgotPassText}>
                <Text style={accountStyle.forgotPassTextField}>Forgot your password?</Text>
              </View>
              
              <View style={accountStyle.termText}>
                <Text style={accountStyle.termTextField}>
                  By sign in, you agree to our Term of use.</Text>
              </View>
            </View>
          
          </View>
        </View>
      </BackgroundWrapper>
    );
  }
}

export const AuthLoginContainer = connect(
  state => ({
    auth: state.auth
  })
)(AuthLoginView);
