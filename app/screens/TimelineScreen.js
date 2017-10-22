import React, { Component } from 'react';
import { ScrollView, TouchableHighlight, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import Article from '../components/Article';

import data from '../data.json';

const MainView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 20px;
`;
const TimelineScrollView = styled.ScrollView`
  backgroundColor: #eeeeee;
  flex: 1;
  height: 100%;
`;

const Header = styled.View`
  height: 40px;
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
`;

const IconButton = styled.TouchableHighlight`
  padding: 5px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #eeeeee;
`;

const HeaderText = styled.Text`
  background-color: #ffffff;
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export default class TimelineScreen extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="view-list" size={30} />,
    tabBarLabel: 'Timeline'    
  }

  handleCameraPress = () => {
    alert('test');
  };

  render() {
    return (
      <MainView>
        <Header>
          <IconButton style={{ justifyContent: 'flex-start' }} onPress={this.handleCameraPress}>
            <Icon name="camera" size={30} />
          </IconButton>
          <HeaderText>Cat Story</HeaderText>
          <IconButton style={{ justifyContent: 'flex-end' }}>
            <Icon name="message-plus" size={30} />
          </IconButton>
        </Header>
        <TimelineScrollView>
          {data.map((article, key) => {
            return (
              <Article key={key} article={article} />
            );
          })}
        </TimelineScrollView>
      </MainView>
    );
  }
}