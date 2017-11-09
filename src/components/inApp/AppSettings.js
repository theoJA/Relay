import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class AppSettings extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    
    let headerLeft = (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
        >
          <Ionicons style={Styles.iconStyle} name="md-menu" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );

    return {
      title: 'Settings',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerLeft,
    };
  };


  render() {
    return (
      <View style={Styles.container}>
        <Text>Change settings here</Text>
      </View>
    )
  }
}

const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  navbarItemStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    padding: 10
  }
}