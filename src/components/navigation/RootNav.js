
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import AuthScreen from '../auth/AuthScreen';
import GetStarted from '../auth/GetStarted';

export const AuthNav = StackNavigator(
  {
    MainAuth: {
      screen: AuthScreen,
    },
    SignUp: {
      screen: GetStarted,
    },
  },
);

export const RootNav = StackNavigator(
  {
    Auth: {
      screen: AuthNav,
      navigationOptions: {
        header: null
      }
    },
  },
);
