import React, { Component } from 'react';
import { View, Platform } from 'react-native';

export default class ViewWrapper extends Component {
  render() {
    const { style = {}, children } = this.props;
    style.paddingTop = (Platform.OS === 'ios') ? 20 : 0;
    
    return (
      <View style={style} >
        {children}
      </View>
    );
  }
}