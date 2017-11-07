import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

export default class RegisterEmail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  // resets the navigation stack to prevent cyclical navigation
  resetNavStack = NavigationActions.reset({
    index: 2,
    actions: [
      NavigationActions.navigate({routeName: 'Logo'}),
      NavigationActions.navigate({routeName: 'SignIn'}),
      NavigationActions.navigate({routeName: 'SignInEmail'}),
    ]
  });

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let title = (
      <Ionicons name="md-mail" size={32} color="black" />
    );
    let headerRight = (
      <TouchableOpacity
        onPress={params.register}
      >
        <View style={{marginRight: 10, borderColor: '#000', borderRadius: 5, borderWidth: 1, padding: 5}}>
          <Text style={{fontSize: 16}}>
            Register
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
    this.props.navigation.setParams({ register: this.registerUser });
  }
  
  registerUser = () => {
    alert('Registration success!');
    Keyboard.dismiss;
    this.props.navigation.dispatch(this.resetNavStack);
    // this is where we will send the user data to firebase for registration
    // if there is no error then we return true, which will allow header button to navigate to signing in
    // if there is an error, we return the error message and print it out
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={Styles.container}
        behavior="padding"
      >
        <View style={Styles.innerContainer}>

          <Text style={Styles.textInputTitleStyle}>
            USERNAME
          </Text>
          <TextInput 
          style={Styles.textInputStyle} 
          onChangeText={(text) => this.setState({ username: text })}
          />

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