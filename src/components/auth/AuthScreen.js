import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from '../common/Button'

class AuthScreen extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.authTitle}>ToGoNotes</Text>
        <Image
          style={Styles.appLogo}
          source={require('../../images/latest-logo.png')}
        />
        <Text style={Styles.subTitle}>Bite-sized knowledge.</Text>
        <Text style={Styles.subTitle}>Anytime. Anywhere.</Text>
        <Button>Get Started</Button>
      </View>
    )
  }
}

const Styles = {
  authTitle: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  appLogo: {
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
}

export default AuthScreen