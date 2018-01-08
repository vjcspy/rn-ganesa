import * as React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {outletRegisterStyles} from "../../styles/outlet-register";
import {Label} from "native-base";
import {translate} from "../../../../i18n/i18n";
import {RegisterViewContainer} from "./Register";

class PosOutletView extends React.Component {
    state = {};
    
    outletRegisterData = {
    
    };
    
    render() {
        return (
            <View style={outletRegisterStyles.container}>
                <View style={outletRegisterStyles.outletForm}>
                    <View style={{flex: 113}}/>
                    
                    <View style={{flex: 1143, flexDirection: "column"}}>
                        
                        <View style={outletRegisterStyles.textHeader}>
                            <Label style={{
                                fontSize: 32,
                                color: "#555555"
                            }}>{translate("select_register")}</Label>
                        </View>
                        
                        <View style={{backgroundColor: "#555555", height: 1}}/>
                        
                        <View style={outletRegisterStyles.registerContainer}>
                            <RegisterViewContainer></RegisterViewContainer>
                        </View>
                    
                    </View>
                    
                    <View style={{flex: 113}}/>
                </View>
            </View>
        );
    }
}

export const PosOutletViewContainer = connect()(PosOutletView);
