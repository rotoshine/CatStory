import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FitImage from 'react-native-fit-image';

moment.locale('kr');

const StoryView = styled.View`
  display: flex;
  flex-direction: column;
  margin: 10px 15px 10px 15px;
  borderColor: #dddddd;
  borderRadius: 3px;
  borderWidth: 1px;
  backgroundColor: #ffffff;
`;

const Header = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserImage = styled.Image`
  width: 30px;
  height: 30px;
  borderColor: #dddddd;
  borderWidth: 1px;
  borderRadius: 15px;
  marginRight: 5px;
`;

const HeaderUsernameText = styled.Text`
  font-weight: bold;
  marginTop: 3px;
`;
const Actions = styled.View`

`;

const Body = styled.View`
  display: flex;
  flex-direction: column
  padding: 5px 10px 5px 10px;
`;

const Content = styled.View`
  display: flex;
  flex-direction: row
`;

const UsernameText = styled.Text`
  font-weight: bold;
  marginRight: 3px;
`;

const StoryMenu = styled.View`
  justify-content: flex-end;
`;

const MomentText = styled.Text`
  color: #999999;
  fontSize: 10;
`;

const Story = ({ story }) => (
  <StoryView>
    <Header>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <UserImage source={{ uri: 'https://pbs.twimg.com/profile_images/870916546704490497/YpnQtyBK_bigger.jpg' }}/>
        <HeaderUsernameText aderUsernameText>{story.name}</HeaderUsernameText>
      </View>
      <Icon name="menu-down" size={20}/>
    </Header>
    <FitImage indicator source={{ uri: story.imageUri }}/>
    <Body>
    <Content>
      <UsernameText>{story.name}</UsernameText>
      <Text>{story.content}</Text>
    </Content>
    <MomentText>{moment(story.createdAt).fromNow()}</MomentText>
    </Body>
  </StoryView>
);


export default Story;