import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import NoteEditor from '../common/NoteEditor'

export default class CreateNote extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
  
    let headerRight = (
      <TouchableOpacity
        
      >
        <View style={{marginRight: 10, borderColor: '#fff', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16, color: '#fff'}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    )

    return {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#273746', marginTop: Expo.Constants.statusBarHeight },
      headerTitleStyle: { color: 'white'},
      headerRight,
    };
  };


  render() {
    return (
      <View style={Styles.container}>

        <NoteEditor/>
            

      </View>

    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  navbarItemStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    padding: 10
  },
  textInput: {
    fontSize: 15,
    margin: 10,
    padding: 10
  },
  boldButton: {
    margin: 5,
    borderColor: '#000', 
    borderRadius: 5, 
    borderWidth: 1, 
    padding: 5,
  }
});