import React, { Component } from 'react';
import { createStore, applyMiddleware  } from "redux";
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from "./src/reducers";
import { StyleSheet, Text, View } from 'react-native';
import { RootNav } from './src/components/navigation/RootNav';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyD9kmetCBxIiOvoyILTosAtKDyhVEB1_J0",
      authDomain: "relay-d8096.firebaseapp.com",
      databaseURL: "https://relay-d8096.firebaseio.com",
      projectId: "relay-d8096",
      storageBucket: "relay-d8096.appspot.com",
      messagingSenderId: "172488537463"
    };
    firebase.initializeApp(config);
  }

  render() {

    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}
