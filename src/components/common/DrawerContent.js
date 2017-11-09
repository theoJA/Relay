import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DrawerItems } from "react-navigation";
import { EvilIcons } from '@expo/vector-icons';


export default class DrawerContent extends Component {
  render() {
    return <View style={Styles.container}>
        <View style={Styles.userIconContainer}>
          <TouchableOpacity>
            <EvilIcons name="user" size={150} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Theo JA</Text>
          </TouchableOpacity>
        </View>

        <DrawerItems {...this.props} />

        <View style={Styles.logOutContainer}>
          <TouchableOpacity>
            <Text style={Styles.logOutStyle}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.footerContainer}>
        </View>
      </View>;
  }; 
}

/*  This is the logo and footer in case I might need it
<View style={Styles.footerContainer}>
          <View style={Styles.logoStyle}>
            <Image style={Styles.appLogo} source={require("../../images/latest-logo.png")} />
          </View>
          <View style={Styles.footerWordsContainer}>
            <Text>ToGoNotes</Text>
          </View>
        </View>
*/

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userIconContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 5
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    padding: 50,
    flexDirection: 'row'
  },
  appLogo: {
    height: 24,
    width: 24
  },
  logoStyle: {
    justifyContent: 'center'
  },
  footerWordsContainer: {
    padding: 5,
    justifyContent: 'center'
  },
  logOutContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    padding: 18
  },
  logOutStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});