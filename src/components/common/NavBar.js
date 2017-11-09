import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class NavBar extends Component {

  render() {
    return (
      <View style={Styles.container}>
      
        <View style={Styles.menuStyle}>
          <TouchableOpacity>
            <Ionicons style={Styles.iconStyle} name="md-menu" size={32} color="white" />
          </TouchableOpacity>
        </View>
          
        <View style={Styles.navbarItemStyle}>
          <TouchableOpacity>
            <Ionicons style={Styles.iconStyle} name="ios-add-circle" size={32} color="white" />
          </TouchableOpacity>
            
          <TouchableOpacity>
            <Ionicons style={Styles.iconStyle} name="ios-funnel" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons style={Styles.iconStyle} name="md-search" size={32} color="white" />
          </TouchableOpacity>
        </View> 
      </View>
    )
  }
}

const Styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#273746',
    marginTop: Expo.Constants.statusBarHeight,
    height: 56,
  },
  menuStyle: {
    flex: 3,
  },
  navbarItemStyle: {
    flexDirection: 'row',
    flex: 2,
  },
  iconStyle: {
    padding: 10
  }

}