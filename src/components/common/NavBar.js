import React, { Component } from "react";
import { View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class NavBar extends Component {

  render() {
    return (
      <View>
        <Text>Welcome to the home screen</Text>
      </View>
    )
  }
}

const Styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ECEFF1',
  }
}