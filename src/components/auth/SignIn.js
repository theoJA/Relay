import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { OauthButton } from '../common/OauthButton'

export default class SignUp extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Sign In',
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: { marginTop: Expo.Constants.statusBarHeight },
      headerRight: (
          <TouchableOpacity
            onPress={() => {alert('Im signing in')}}
          >
            <View style={{marginRight: 10, borderColor: '#000', borderRadius: 5, borderWidth: 1, padding: 5}}>
              <Text style={{fontSize: 16}}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
      ),
    };
  };

  render() {
    return (
      <View>
        <TouchableOpacity>
          <OauthButton name="logo-google" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
        <OauthButton name="logo-facebook" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
        <OauthButton name="logo-twitter" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
        <OauthButton name="md-mail" size={32} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
}

const Styles = {
  googleLoginStyle: {

  }
}