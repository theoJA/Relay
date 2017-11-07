import React, { Component } from "react";
import { View, Text } from "react-native";
import NavBar from "../common/NavBar";

export default class Home extends Component {

  static navigationOptions = {
    header: null,
    headerStyle: { marginTop: Expo.Constants.statusBarHeight },
  };

  render() {
    return (
      <View>
        <NavBar />
      </View>
    )
  }
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECEFF1',
  }
}