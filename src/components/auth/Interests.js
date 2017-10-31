import React, { Component } from 'react';
import { 
  View, 
  Text,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import { programs, computerScience } from '../../Programs_Subjects'
import RenderSectionList from "../common/RenderSectionList";

export default class GetStarted extends Component {

  static navigationOptions = ({ navigation }) => {
    let headerRight = (
      <TouchableOpacity
        onPress={() => {navigation.navigate('Register')}}
      >
        <View style={{marginRight: 10, borderColor: '#000', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    )
    return {
      title: 'Interests',
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: { marginTop: Expo.Constants.statusBarHeight },
      headerRight,
    };
  };


  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.TextStyle}>
          Select a program and add at least 
          <Text style={{fontWeight: 'bold'}}> one </Text>field of interest:
        </Text>
        <ScrollView>
          <RenderSectionList />
        </ScrollView>
      </View>
    );
  };
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECEFF1',
  },
  TextStyle: {
    textAlign: 'center', 
    fontSize: 14,
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 10,
    paddingBottom: 10
  }
}