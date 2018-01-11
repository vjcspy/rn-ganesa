import React, {Component} from "react";
import {PropTypes} from "prop-types";
import {View, Image, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class BackgroundWrapper extends Component {
  renderChildren() {
    let childrens = [];
    if (this.props.iconLeft) {
      childrens.push(
        <TouchableOpacity key="icon_left" onPress={this.props.onPressIcon} style={{height: 35}}>
          <Icon color="#ffffff" size={25} name={this.props.iconLeft} style={styleWrapper.icon}/>
        </TouchableOpacity>
      );
    }
    childrens.push(this.props.children);
    return childrens;
  }
  
  renderViewBackground() {
    const style = [
      styleWrapper.containerView,
    ];
    return <View style={{flex: 1}}>
      <Image style={{
        flex          : 1,
        resizeMode    : "stretch",
        position      : "absolute",
        width         : "100%",
        height        : "100%",
        justifyContent: "center",
        opacity       : 0.8
      }} source={this.props.background}>
      </Image>
      
      <Image style={{
        backgroundColor: "black",
        resizeMode     : "stretch",
        position       : "absolute",
        width          : "100%",
        height         : "100%",
        justifyContent : "center",
        opacity        : 0.6
      }}/>
      <View style={style}>
        {this.renderChildren()}
      </View>
    </View>;
  }
  
  render() {
    return this.renderViewBackground();
  }
}

BackgroundWrapper.propTypes = {
  children   : PropTypes.any,
  iconLeft   : PropTypes.string,
  onPressIcon: PropTypes.func,
  paddingTop : PropTypes.number,
  background : PropTypes.any
};

const styleWrapper = {
  containerView: {
    flex: 1
  },
  icon         : {
    marginLeft     : 10,
    position       : "relative",
    top            : 6,
    opacity        : .8,
    backgroundColor: "transparent"
  }
};
;
