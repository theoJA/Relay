import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { OauthButton } from '../common/OauthButton'

export default class SignIn extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <View style={{marginRight: 10}}>
      </View>
    );
    return {
      title: 'Sign In',
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: { marginTop: Expo.Constants.statusBarHeight },
      headerRight
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ tellWhereMansAt: this.whereAmIAt });
  }

  whereAmIAt = () => {
    alert('Im in sign in bruv. Mans not hot');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <TouchableOpacity>
          <OauthButton name="logo-google" size={32} color="white" buttonColor="#EC7063" buttonTitle="Continue with Google"/>
        </TouchableOpacity>

        <TouchableOpacity>
        <OauthButton name="logo-facebook" size={32} color="white" buttonColor="#1565C0" buttonTitle="Continue with Facebook"/>
        </TouchableOpacity>

        <TouchableOpacity>
        <OauthButton name="logo-twitter" size={32} color="white" buttonColor="#4FC3F7" buttonTitle="Continue with Twitter"/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('SignInEmail')}
        >
        <OauthButton name="md-mail" size={32} color="white" buttonColor="#78909C" buttonTitle="Continue with Email"/>
        </TouchableOpacity>
      </View>
    )
  }
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECEFF1',
  }
}