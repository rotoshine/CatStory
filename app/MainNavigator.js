import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from './screens/profileTab/ProfileScreen';
import ProfileEditScreen from './screens/profileTab/ProfileEditScreen';
import LoginScreen from './screens/auth/LoginScreen';
import CreateAccountScreen from './screens/auth/CreateAccountScreen';
import SelectMediaScreen from './screens/storyTab/SelectMediaScreen';
import CreateStoryScreen from './screens/storyTab/CreateStoryScreen';
import TimelineScreen from './screens/timelineTab/TimelineScreen';

const MainTabNavigator = TabNavigator({
  TimelineTab: {
    screen: TimelineScreen
  },
  CreateNewStoryTab: {
    screen: StackNavigator({
      SelectMedia: {
        screen: SelectMediaScreen
      },
      CreateStory: {
        screen: CreateStoryScreen
      }
    }),
    navigationOptions: {
      tabBarIcon: () => <Icon name="plus" size={30}/>
    }
  },
  ProfileTab: {
    screen: StackNavigator({
      Profile: {
        screen: ProfileScreen
      },
      ProfileEdit: {
        screen: ProfileEditScreen
      }
    }),
    navigationOptions: {
      tabBarIcon: () => <Icon name="cat" size={30}/>
    }
  }
}, {
  swipeEnabled: false,
  tabBarComponent: TabBarTop,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    pressColor: '#eeeeee',
    activeTintColor: '#000000',
    inactiveTintColor: '#cccccc',
    tabStyle: {
      backgroundColor: '#ffffff'
    },
    style: {
      backgroundColor: '#cccccc'
    }
  },
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});

const MainNavigator = StackNavigator({
  Tab: {
    screen: MainTabNavigator
  },
  WithoutTab: {
    screen: StackNavigator({
      Login: {
        screen: LoginScreen
      },
      CreateAccount: {
        screen: CreateAccountScreen
      }
    })
  }
}, {
  headerMode: 'none'
});
export default MainNavigator;