import React, { Component } from 'react';
import { connect } from "react-redux";
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
import * as actions from '../../actions';

class SignInEmail extends Component {
  
  // resets the navigation stack to go to another parent stack nav
  // --> NEEDS FIXING!!!!!!
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
    this.props.navigation.setParams({ signUp: this.signInEmail });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  signInEmail = async () => {
    const { email, password } = this.props;
    
    Keyboard.dismiss;
    await this.props.signInEmail({ email, password });
    
    if (this.props.error === '') {
      ToastAndroid.show('Welcome back!', ToastAndroid.LONG);
      this.props.navigation.dispatch(this.changeToAppNavStack);
    }
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
          placeholder="email@email.com" 
          style={Styles.textInputStyle}
          onChangeText={this.onEmailChange.bind(this)} 
          value={this.props.email}
          />

          <Text style={Styles.textInputTitleStyle}>
            PASSWORD
          </Text>
          <TextInput 
          placeholder="aStrongPassword"
          style={Styles.textInputStyle} 
          secureTextEntry={true}
          onChangeText={this.onPasswordChange.bind(this)} 
          value={this.props.password} 
          />

          <Text style={Styles.errorTextStyle}>
            {this.props.error}
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
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, actions)(SignInEmail);