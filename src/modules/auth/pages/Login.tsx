import * as PropTypes from "prop-types";
import * as React from "react";
import {connect} from "react-redux";
import {View, Animated} from "react-native";
import BackgroundWrapper from "../../../framework/native-base/components/partials/BackgroundWrapper";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button, Text, Item, Input, Label} from "native-base";
import accountStyle from "../styles/account";
import {AuthActions} from "../R/actions";
import {app} from "../../../framework/general/app";

class AuthLoginView extends React.Component<any, any> {
    state = {
        email: "",
        password: "",
        animation: {
            usernamePostionLeft: new Animated.Value(795),
            passwordPositionLeft: new Animated.Value(905),
            loginPositionTop: new Animated.Value(1402),
            statusPositionTop: new Animated.Value(1542)
        }
    };
    
    componentDidMount() {
        const timing = Animated.timing;
        Animated.parallel([
                              timing(this.state.animation.usernamePostionLeft, {
                                  toValue: 0,
                                  duration: 900
                              }),
                              timing(this.state.animation.passwordPositionLeft, {
                                  toValue: 0,
                                  duration: 900
                              }),
                              timing(this.state.animation.loginPositionTop, {
                                  toValue: 0,
                                  duration: 900
                              }),
                              timing(this.state.animation.statusPositionTop, {
                                  toValue: 0,
                                  duration: 900
                              })
        
                          ]).start();
    }
    
    handlePressSignIn = () => {
        this.getAuthActions().loginWithEmail(this.state.email, this.state.password);
    };
    
    getAuthActions(): AuthActions {
        return app().resolve(AuthActions);
    }
    
    signOut = () => {
        this.state.email    = "";
        this.state.password = "";
        this.getAuthActions().logout()
    };
    
    render() {
        return (
            <BackgroundWrapper background={require("../../../../images/ec-background.jpeg")}>
                <View style={accountStyle.loginContainer}>
                    <View style={accountStyle.formContent}>
                        
                        {/*social login*/}
                        <View style={accountStyle.socialLoginContent}>
                            <Animated.View
                                style={{position: "relative", bottom: this.state.animation.loginPositionTop}}>
                                <Button iconLeft style={accountStyle.socialButton} danger>
                                    <Icon name="google" style={accountStyle.buttonIcon}/>
                                    <Text>Sign in with Google+</Text>
                                </Button>
                                <Button iconLeft style={accountStyle.socialButton}>
                                    <Icon name="facebook-official" style={accountStyle.buttonIcon}/>
                                    <Text>Sign in with Facebook</Text>
                                </Button>
                                <Text style={accountStyle.socialTextSignin}>Or sign in with your account!</Text>
                            </Animated.View>
                        </View>
                        
                        {/*account login*/}
                        <View style={accountStyle.accountContent}>
                            <View>
                                <Animated.View
                                    style={{position: "relative", left: this.state.animation.usernamePostionLeft}}>
                                    <Item style={accountStyle.textInputEmail} fixedLabel>
                                        <Label>Email</Label>
                                        <Input onChangeText={(email) => {this.setState({email});}}
                                               defaultValue={this.props.auth.user ? this.props.auth.user["email"] : ""}
                                               editable={this.props.auth.user === null}
                                               keyboardType="email-address"
                                               autoCorrect={false} autoCapitalize="none"/>
                                    </Item>
                                </Animated.View>
                                <Animated.View
                                    style={{position: "relative", right: this.state.animation.passwordPositionLeft}}>
                                    <Item style={accountStyle.textInputPassword} fixedLabel>
                                        <Label>Password</Label>
                                        <Input onChangeText={(password) => {this.setState({password});}}
                                               defaultValue=""
                                               editable={this.props.auth.user === null}
                                               secureTextEntry={true}
                                               autoCorrect={false}
                                               autoCapitalize="none"/>
                                    </Item>
                                </Animated.View>
                                <Animated.View style={{position: "relative", top: this.state.animation.loginPositionTop}}>
                                </Animated.View>
                            </View>
                            
                            <View style={accountStyle.accountContentButtonContainer}>
                                <Animated.View style={{
                                    flex: 0.5,
                                    position: "relative",
                                    top: this.state.animation.loginPositionTop
                                }}>
                                    <Button light style={accountStyle.accountContentButton}
                                            disabled={this.props.auth.user === null}
                                            onPress={this.signOut}>
                                        <Text style={accountStyle.accountContentTextButton}>Sign Out </Text>
                                    </Button>
                                </Animated.View>
                                <View style={{flex: 0.03}}/>
                                <Animated.View style={{
                                    flex: 0.5,
                                    position: "relative",
                                    top: this.state.animation.loginPositionTop
                                }}>
                                    <Button light style={accountStyle.accountContentButton} onPress={this.handlePressSignIn}>
                                        <Text style={accountStyle.accountContentTextButton}> Sign In </Text>
                                    </Button>
                                </Animated.View>
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
        auth: state["auth"]
    }),
    dispatch => ({
        dispatch
    })
)(AuthLoginView);

AuthLoginView["propTypes"] = {
    dispatch: PropTypes.any.isRequired,
    auth: PropTypes.any.isRequired
};
