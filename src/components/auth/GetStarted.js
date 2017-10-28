import React, { Component } from 'react';
import { 
  View, 
  Text,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import { programs, computerScience } from '../../Programs_Subjects'
import { CardSection } from '../common';
import RenderSectionList from "../common/RenderSectionList";

export default class GetStarted extends Component {

  static navigationOptions = {
    title: 'Interests',
    headerTitleStyle: {alignSelf: 'center'},
    headerStyle: { marginTop: Expo.Constants.statusBarHeight },
    headerRight: 
      <TouchableOpacity>
        <View style={{marginRight: 10, borderColor: '#000', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16}}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
  };

  render() {
    return (
      <View style={Styles.container}>
        <CardSection>
          <Text style={Styles.TextStyle}>
            Expand a program and select subjects or topics of interest:
          </Text>
        </CardSection>
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
    backgroundColor: '#fff',
  },
  TextStyle: {
    textAlign: 'center', 
    fontSize: 14,
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 5,
    paddingBottom: 5
  }
}