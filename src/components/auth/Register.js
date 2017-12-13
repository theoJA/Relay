import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { OauthButton } from '../common/OauthButton'

export default class SignUp extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
        <View style={{marginRight: 10}}>
        </View>
    );
    
    return {
      title: 'Register',
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: { marginTop: Expo.Constants.statusBarHeight },
      headerRight,
    };
  };

  showInterests() {
    alert(this.props.navigation.state.params.interests);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <TouchableOpacity
          onPress={this.showInterests.bind(this)}
        >
          <OauthButton name="logo-google" size={32} color="white" buttonColor="#EC7063" buttonTitle="Continue with Google"/>
        </TouchableOpacity>

        <TouchableOpacity>
          <OauthButton name="logo-facebook" size={32} color="white" buttonColor="#1565C0" buttonTitle="Continue with Facebook"/>
        </TouchableOpacity>

        <TouchableOpacity>
          <OauthButton name="logo-twitter" size={32} color="white" buttonColor="#4FC3F7" buttonTitle="Continue with Twitter"/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('RegisterEmail', { interests: this.props.navigation.state.params.interests})}
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