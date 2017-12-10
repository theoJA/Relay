import React, { Component } from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { RootNav } from './src/components/navigation/RootNav';

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
      <RootNav />
      
    );
  }
}
