import * as React from "react";
import {Button, View} from "react-native";
import {connect} from "react-redux";
import {outletRegisterStyles} from "../../styles/outlet-register";
import {Label} from "native-base";
import {PosViewWrapper} from "../../components/PosViewWrapper";
import {ProgressActions} from "../../../../../../framework/modules/pos/R/progress-bar/actions";
import {translate} from "../../../../../../framework/i18n";
import {app} from "../../../../../../framework/general/app";
import {RealmDB} from "../../../../realm";
import {PosPullActions} from "../../../../../../framework/modules/pos/R/entities/pull.actions";
import {TaxClassDB} from "../../../../../../framework/modules/pos/database/xretail/db/tax-class";
import {ProductDB} from "../../../../../../framework/modules/pos/database/xretail/db/product";
import {DatabaseManager} from "../../../../../../framework/modules/pos/database/xretail";
import * as _ from "lodash";

class PosOutletView extends React.Component<any, any> {
    state = {};

    protected progressInteval;

    protected test(work: string) {
        setTimeout(() => {
            switch (work) {
                case "deleteDB":
                    RealmDB.deleteDB();
                    break;
                case "pull":
                    app().resolve<PosPullActions>(PosPullActions).pullEntities([
                        TaxClassDB.getCode(),
                        ProductDB.getCode()
                    ]);
                    break;
                case "nop":
                    app().resolve<DatabaseManager>(DatabaseManager)
                         .getDbInstance()
                         .products
                         .toArray()
                         .then((data) => {
                             console.log(1);

                             console.log(_.size(data));
                         });
                    break;
                case "progress":
                    if (typeof this.progressInteval !== 'undefined') {
                        clearInterval(this.progressInteval);
                    }
                    let _p               = 0;
                    this.progressInteval = setInterval(() => {
                        _p += 0.1;
                        app().resolve<ProgressActions>(ProgressActions).updateProgressBar(_p);

                        if (_p > 1) {
                            clearInterval(this.progressInteval);
                        }
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
                    }}>{translate("outlet_page")}</Label>
                </View>

                <View style={outletRegisterStyles.registerContainer}>
                    <View>
                        <Button title="Pull" onPress={() => this.test('pull')}/>
                        <Button title="Number Product" onPress={() => this.test('nop')}/>
                        <Button title="Test Progress" onPress={() => this.test('progress')}/>
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
