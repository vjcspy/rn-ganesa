import React, {Component} from "react";
import PropTypes from "prop-types";
import {addNavigationHelpers} from "react-navigation";

import AppNavigator from "./Navigator";

class NavigatorView extends Component {
  static displayName = "NavigationView";
  
  static propTypes = {
    dispatch      : PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
                                      index : PropTypes.number.isRequired,
                                      routes: PropTypes.arrayOf(PropTypes.shape({
                                                                                  key      : PropTypes.string.isRequired,
                                                                                  routeName: PropTypes.string.isRequired
                                                                                }))
                                    }).isRequired
  };
  
  render() {
    return (
      <AppNavigator
        /*
        * Why we need navigation here??? Cái này là để integrate react native navigation với redux
        *  Nếu không có thì không dùng được stackNavigation
        *  Có 2 điều kiện để navigation render lại UI
        *  1. State change. Cái đó phải làm trong reducer
        *  2. prop change ở trong các component
        * */
        navigation={
          addNavigationHelpers({
                                 dispatch: this.props.dispatch,
                                 state   : this.props.navigatorState
                               })
        }
      />
    );
  }
}

export default NavigatorView;
