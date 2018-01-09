import * as React from "react";
import {Button, View} from "react-native";
import {connect} from "react-redux";
import {outletRegisterStyles} from "../../styles/outlet-register";
import {Label} from "native-base";
import {translate} from "../../../../i18n/i18n";
import {RegisterViewContainer} from "./Register";
import {PosViewWrapper} from "../../components/PosViewWrapper";
import {actionUpdateProgressBar} from "../../r/progress-bar/actions";

class PosOutletView extends React.Component<any, any> {
    state = {};
    
    protected p = 0;
    
    protected test(): void {
        this.p += 0.1;
        this.props.dispatch(actionUpdateProgressBar(this.p));
    }
    
    render() {
        return <PosViewWrapper>
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
                            <Button title="Test" onPress={() => this.test()}/>
                        </View>
                    
                    </View>
                    
                    <View style={{flex: 113}}/>
                </View>
            </View>
        </PosViewWrapper>;
    }
}

export const PosOutletViewContainer = connect(
    state => ({}),
    dispatch => ({dispatch})
)(PosOutletView);
