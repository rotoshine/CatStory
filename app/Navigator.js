import React from 'react';
import { TabNavigator } from 'react-navigation';
import ProfileScreen from './screens/ProfileScreen';
import FormScreen from './screens/FormScreen';
import TimelineScreen from './screens/TimelineScreen';

const Navigator = TabNavigator({
  Timeline: {
    screen: TimelineScreen
  },
  Form: {
    screen: FormScreen
  },
  Profile: {
    screen: ProfileScreen
  }
}, {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#000000',
    inactiveTintColor: '#cccccc',
    style: {
      backgroundColor: '#ffffff',
    }
  }
});

export default Navigator;