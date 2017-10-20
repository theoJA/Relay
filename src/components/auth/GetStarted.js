import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { Button } from '../common/Button';

export default class GetStarted extends Component {

  static navigationOptions = {
    title: 'Interests',
    headerTitleStyle: {alignSelf: 'center'},
    headerRight: <Button title="Next" />,
  };

  render() {
    return (
      <View>
        <Text> 
          Get started here!
        </Text>
      </View>
    );
  };
}

const Styles = {
  headerStyle: {
    justifyContent: 'center',
  }
}