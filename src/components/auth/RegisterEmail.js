import React, { Component } from 'react';
import firebase from 'firebase';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

export default class RegisterEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: null,
      error: '',
      loading: false,
      interests: []
    }
  }

  // resets the navigation stack to prevent cyclical navigation
  changeToAppNavStack = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'Drawer'}),
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
    this.props.navigation.setParams({ register: this.registerEmail });
    this.setState({
      interests: this.props.navigation.state.params.interests
    })
  }

  onEmailChange(text) {
    this.setState({
      email: text
    })
  }

  onPasswordChange(text) {
    this.setState({
      password: text
    })
  }

  registerEmail = async () => {
    let { email, password, interests, error } = this.state;
    let tempUserName = email.split('@')[0];

    Keyboard.dismiss;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase.database().ref(`/users/${user.uid}/profile`)
          .push({ interests, username: tempUserName, profilePic: 'null' });
        ToastAndroid.show('Welcome to Relay!', ToastAndroid.LONG);
        this.props.navigation.dispatch(this.changeToAppNavStack);
      })
      .catch((error) => {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG);
        this.setState({
          error: 'Authentication Failed'
        });
      });
  }

  render() {
    let { email, password, error } = this.state;
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
          placeholder="email@email.com" 
          style={Styles.textInputStyle}
          onChangeText={this.onEmailChange.bind(this)} 
          value={email}
          />

          <Text style={Styles.textInputTitleStyle}>
            PASSWORD
          </Text>
          <TextInput 
          placeholder="aStrongPassword"
          style={Styles.textInputStyle} 
          secureTextEntry={true}
          onChangeText={this.onPasswordChange.bind(this)} 
          value={password}
          />

          <Text style={Styles.errorTextStyle}>
            {error}
          </Text>

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
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
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
};