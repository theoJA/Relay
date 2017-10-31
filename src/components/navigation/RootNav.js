
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LogoScreen from '../auth/LogoScreen';
import Interests from '../auth/Interests';
import Register from "../auth/Register";
import SignIn from "../auth/SignIn";
import RegisterEmail from '../auth/RegisterEmail';
import SignInEmail from "../auth/SignInEmail";

const AuthNav = StackNavigator(
  {
    Logo: {
      screen: LogoScreen,
    },
    Interests: {
      screen: Interests,
    },
    Register: {
      screen: Register,
    },
    RegisterEmail: {
      screen: RegisterEmail,
    },
    SignIn: {
      screen: SignIn,
    },
    SignInEmail: {
      screen: SignInEmail,
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
