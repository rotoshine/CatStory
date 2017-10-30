import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { loadUser, logout } from '../../utils/authUtils';

export default class ProfileEditScreen extends Component {
  static navigationOptions = {
    title: 'Profile Edit'
  };

  render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  }  
}