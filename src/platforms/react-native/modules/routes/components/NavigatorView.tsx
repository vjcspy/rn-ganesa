import * as PropTypes from "prop-types";
import * as React from "react";
import {addNavigationHelpers} from "react-navigation";

import AppNavigator from "./Navigator";
import {connect} from "react-redux";

class NavigatorView extends React.Component<any, any> {
    static displayName = "NavigationView";
    
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigatorState: PropTypes.shape({
                                            index: PropTypes.number.isRequired,
                                            routes: PropTypes.arrayOf(PropTypes.shape({
                                                                                          key: PropTypes.string.isRequired,
                                                                                          routeName: PropTypes.string.isRequired
                                                                                      }))
                                        }).isRequired
    };
    
    render() {
        return (
            <AppNavigator
                navigation={
                    addNavigationHelpers({
                                             dispatch: this.props.dispatch,
                                             state: this.props.navigatorState
                                         })
                }
            />
        );
    }
}

export const NavigatorViewContainer = connect(
    state => ({
        navigatorState: state['navigatorState']
    })
)(NavigatorView);
