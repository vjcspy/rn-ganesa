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
import {countCar, insertCar} from "../../../../database/test/func";
import {DB} from "../../../../database";

class PosOutletView extends React.Component<any, any> {
    state = {};

    protected progressInteval;

    protected test(work: string) {
        setTimeout(() => {
            switch (work) {
                case "insertCar":
                    setTimeout(() => insertCar(500));
                    setTimeout(() => insertCar(500));
                    setTimeout(() => insertCar(500));
                    setTimeout(() => insertCar(500));
                    break;
                case "countCar":
                    countCar();
                    break;
                case "deleteDB":
                    DB.deleteDB();
                    break;
                case "progress":
                    if (typeof this.progressInteval !== 'undefined') {
                        clearInterval(this.progressInteval);
                    }
                    let _p               = 0;
                    this.progressInteval = setInterval(() => {
                        _p += 0.1;
                        app().resolve<ProgressActions>(ProgressActions).updateProgressBar(_p);
                    }, 500);
                    break;
                default:
                    console.log('no support');
            }
        });
    }

    render() {
        return <PosViewWrapper>
            <View style={outletRegisterStyles.container}>

                <View style={outletRegisterStyles.textHeader}>
                    <Label style={{
                        fontSize: 32,
                        color: "#555555"
                    }}>{translate("select_register")}</Label>
                </View>

                <View style={outletRegisterStyles.registerContainer}>
                    <View>
                        <Button title="Test Progress" onPress={() => this.test('progress')}/>
                        <Button title="Test" onPress={() => this.test('insertCar')}/>
                        <Button title="Number Of car" onPress={() => this.test('countCar')}/>
                        <Button title="Delete DB" onPress={() => this.test('deleteDB')}/>
                    </View>
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
