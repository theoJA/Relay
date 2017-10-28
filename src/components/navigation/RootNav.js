
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LogoScreen from '../auth/LogoScreen';
import GetStarted from '../auth/GetStarted';

const AuthNav = StackNavigator(
  {
    Logo: {
      screen: LogoScreen,
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
