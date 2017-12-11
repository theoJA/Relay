import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Home, MyNotes, Bookmarked, AppSettings, CreateNote } from '../inApp';
import {LogoScreen, Interests, Register, SignIn, RegisterEmail, SignInEmail } from '../auth';
import DrawerContent from "../common/DrawerContent";
import MainNav from './MainNav';

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
  CreateNote: {
    screen: CreateNote,
  },
  Logout: {
    screen: LogoScreen, 
  }
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
  Logout: {
    screen: LogoScreen, 
  }
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
  Logout: {
    screen: LogoScreen, 
  }
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
  Logout: {
    screen: LogoScreen, 
  }
});


export default Drawer = DrawerNavigator({
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