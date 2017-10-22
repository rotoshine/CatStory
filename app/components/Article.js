import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FitImage from 'react-native-fit-image';

const ArticleView = styled.View`
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

const ArticleMenu = styled.View`
  justify-content: flex-end;
`;

const MomentText = styled.Text`
  color: #999999;
  fontSize: 10;
`;

const Article = ({ article }) => (
  <ArticleView>
    <Header>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <UserImage source={{ uri: 'https://pbs.twimg.com/profile_images/870916546704490497/YpnQtyBK_bigger.jpg' }} />
        <HeaderUsernameText aderUsernameText>{article.username}</HeaderUsernameText>
      </View>
      <Icon name="menu-down" size={20} />
    </Header>
    <FitImage source={{ uri: article.image }} />
    <Body>
      <Content>
        <UsernameText>{article.username}</UsernameText>
        <Text>{article.content}</Text>
      </Content>
      <MomentText>1일 전</MomentText>
    </Body>
  </ArticleView>
);

export default Article;