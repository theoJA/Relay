import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { Button } from '../common/Button';

export default class AuthScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <Text style={Styles.authTitle}>ToGoNotes</Text>
        <Image
          style={Styles.appLogo}
          source={require('../../images/latest-logo.png')}
        />
        <Text style={Styles.subTitle}>Bite-sized knowledge.</Text>
        <Text style={Styles.subTitle}>Anytime. Anywhere.</Text>
        <Button
          onPress={() => navigate('SignUp')}
          title="Get Started"
        />
        
        <Text style={Styles.alreadyAMember}>
          Already a member?
          <Text> </Text>
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://google.com')}>
            Sign in
          </Text>
        </Text>
      </View>
    );
  };
}

const Styles = {
  authTitle: {
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold'
  },
  appLogo: {
    marginBottom: 10,
    height: 200,
    width: 200
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 20
  },
  alreadyAMember: {
    marginTop: 20
  }
}