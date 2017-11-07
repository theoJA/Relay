
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {LogoScreen, Interests, Register, SignIn, RegisterEmail, SignInEmail } from '../auth';
import { Home } from '../inApp';

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
    Home: {
      screen: Home,
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
