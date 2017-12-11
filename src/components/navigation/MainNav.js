import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {LogoScreen, Interests, Register, SignIn, RegisterEmail, SignInEmail } from '../auth';
import DrawerNav from "./DrawerNav";

export default MainNav = StackNavigator({
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
  Drawer: {
    screen: DrawerNav,
    navigationOptions: {
      header: null,
    }
  }  
});