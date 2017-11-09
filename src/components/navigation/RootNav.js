
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {LogoScreen, Interests, Register, SignIn, RegisterEmail, SignInEmail } from '../auth';
import { Home, MyNotes, Bookmarked, AppSettings } from '../inApp';
import DrawerContent from "../common/DrawerContent";
import { Ionicons } from '@expo/vector-icons';


// Contains: Home, CreateNote, Filter, Search, Note
const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawer: {
        label: 'Home',
      },
    },
  },
});

// Contains: MyNotes, Search, Note
const MyNotesStack = StackNavigator({
  MyNotes: {
    screen: MyNotes,
    navigationOptions: {
      drawer: {
        label: 'My Notes',
      },
    },
  },
});

// Contains: Bookmarked, Search, Note
const BookmarkStack = StackNavigator({
  Bookmarked: {
    screen: Bookmarked,
    navigationOptions: {
      drawer: {
        label: 'Bookmarked',
      },
    },
  },
});

// Contains: Settings
const SettingStack = StackNavigator({
  AppSettings: {
    screen: AppSettings,
    navigationOptions: {
      drawer: {
        label: 'Settings',
      },
    },
  },
});


const Drawer = DrawerNavigator({
  Home: { 
    screen: HomeStack 
  },
  MyNotes: {
    screen: MyNotesStack
  },
  Bookmarked: {
    screen: BookmarkStack
  },
  AppSettings: {
    screen: SettingStack
  },
},
{
  contentOptions: {
    activeTintColor: '#000',
    activeBackgroundColor: '#C5E1A5',
  },
  contentComponent: (props) => <DrawerContent {...props} />
}
);

const MainNav = StackNavigator({
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
    screen: Drawer,
    navigationOptions: {
      header: null,
    }
  }  
});

export const RootNav = StackNavigator({
  Root: {
    screen: MainNav,
    navigationOptions: {
      header: null
    }
  },
});
