
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LogoScreen from '../auth/LogoScreen';
import Interests from '../auth/Interests';
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";

const AuthNav = StackNavigator(
  {
    Logo: {
      screen: LogoScreen,
    },
    Interests: {
      screen: Interests,
    },
    SignUp: {
      screen: SignUp,
    },
    SignIn: {
      screen: SignIn,
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
