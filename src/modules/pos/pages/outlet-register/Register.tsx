import * as React from 'react'
import {Text, View} from "react-native";
import {connect} from "react-redux";

class RegisterView extends React.Component {
    render() {
        return <View>
            <Text>Register</Text>
        </View>
    }
}

export const RegisterViewContainer = connect()(RegisterView);
