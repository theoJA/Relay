import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

export default class SignInEmail extends Component {
  
  // resets the navigation stack to go to another parent stack nav
  // --> NEEDS FIXING!!!!!!
  changeToAppNavStack = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'Home'}),
    ]
  });

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let title = (
      <Ionicons name="md-mail" size={32} color="black" />
    );
    let headerRight = (
      <TouchableOpacity
        onPress={params.signUp}
      >
        <View style={{marginRight: 10, borderColor: '#000', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16}}>
            Sign In
          </Text>
        </View>
      </TouchableOpacity>
    );
    
    return {
      title,
      headerTitleStyle: {alignSelf: 'center'},
      headerStyle: { marginTop: Expo.Constants.statusBarHeight },
      headerRight,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ signUp: this.signUpUser });
  }

  signUpUser = () => {
    alert('signing in');
    this.props.navigation.dispatch(this.changeToAppNavStack);
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={Styles.container}
        behavior="padding"
      >
        <View style={Styles.innerContainer}>

          <Text style={Styles.textInputTitleStyle}>
            EMAIL
          </Text>
          <TextInput 
          style={Styles.textInputStyle}
          onChangeText={(text) => this.setState({ email: text })} 
          />

          <Text style={Styles.textInputTitleStyle}>
            PASSWORD
          </Text>
          <TextInput 
          style={Styles.textInputStyle} 
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })} 
          />

        </View>
      </KeyboardAvoidingView>
    )
  }
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECEFF1',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ECEFF1',
    margin: 30,
    marginTop: 20
  },
  textInputTitleStyle: {
    color: "#566573",
    fontSize: 15,
    marginTop: 20
  },
  textInputStyle: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 18
  }
}