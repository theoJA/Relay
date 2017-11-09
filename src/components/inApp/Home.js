import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class Home extends Component {

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
  
    let headerRight = (
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
    );

    return {
      title: 'Home',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerRight,
      headerLeft,
    };
  };


  render() {
    return (
      <View style={Styles.container}>
        <Text>A list of notes</Text>
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