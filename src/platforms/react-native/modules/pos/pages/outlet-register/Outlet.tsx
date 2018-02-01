import * as React from "react";
import {Button, View} from "react-native";
import {connect} from "react-redux";
import {outletRegisterStyles} from "../../styles/outlet-register";
import {Label} from "native-base";
import {RegisterViewContainer} from "./Register";
import {PosViewWrapper} from "../../components/PosViewWrapper";
import {ProgressActions} from "../../../../../../framework/modules/pos/R/progress-bar/actions";
import {translate} from "../../../../../../framework/i18n";
import {app} from "../../../../../../framework/general/app";

class PosOutletView extends React.Component<any, any> {
    state = {};

    protected p = 0;

    protected test(): void {
        let i = 0;
        setInterval(() => {
            if (i > 1) {
                i = 0;
            } else {
                i += 0.1;
            }
            app().resolve<ProgressActions>(ProgressActions).updateProgressBar(i);
        }, 500);
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

    protected getProgressAction(): ProgressActions {
        return this.props.progressActions;
    }
}

export const PosOutletViewContainer = connect(
    state => ({}),
    dispatch => ({progressActions: app().resolve(ProgressActions)})
)(PosOutletView);
