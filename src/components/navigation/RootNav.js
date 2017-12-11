
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainNav from "./MainNav";

export const RootNav = StackNavigator({
  Root: {
    screen: MainNav,
    navigationOptions: {
      header: null
    }
  },
});
