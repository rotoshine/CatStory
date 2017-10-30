import React, { Component } from 'react';
import { TouchableHighlight, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { loadUser, logout } from '../../utils/authUtils';

const ProfileView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserActions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserActionButtons = styled.View`
  display: flex;
  flex-direction: row;
  width: 100px;
  margin-right: 10px;
`;

const UserActionButton = styled.View`
  margin-right: 5px;
`;

const Username = styled.Text`
  font-size: 20px;
  padding: 5px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const UserImage = styled.Image`
  margin-right: 10px;
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

const UserStatusAndProfileButton = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserStatus = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`;

const Count = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column
`;

const CountText = styled.Text`
  font-weight: bold;
`;

const ProfileEditButton = styled.Text`
  border-width: 1px;
  border-radius: 5px;
  border-color: #cccccc;
  text-align: center;
  padding: 4px;
`;

const ProfileDescriptionView = styled.View`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export default class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="plus" size={30}/>,
    header: null
  };
  constructor (props) {
    super(props);

    this.state = {
      user: null,
      result: null
    };
  }

  componentWillMount () {
    this.loadUser();
  }

  async loadUser () {
    const user = await loadUser();
    if (user === null) {
      this.moveLoginScreen();
    } else {
      this.setState({
        user
      });
    }
  }


  async logout () {
    await logout();
    this.moveLoginScreen();
  }

  moveLoginScreen () {
    this.props.navigation.navigate('Login');
  }

  render () {
    const { user } = this.state;

    if (user === null) {
      return null;
    }

    return (
      <ProfileView>
        <UserActions>
          <Username>{user.name}</Username>
          <UserActionButtons>
            <UserActionButton>
              <Icon name="bookmark" size={30}/>
            </UserActionButton>
            <UserActionButton>
              <Icon name="account-plus" size={30}/>
            </UserActionButton>
            <UserActionButton>
              <Icon name="menu" size={30}/>
            </UserActionButton>
          </UserActionButtons>
        </UserActions>
        <Header>
          <UserImage source={{ uri: 'https://pbs.twimg.com/profile_images/870916546704490497/YpnQtyBK_bigger.jpg' }}/>
          <UserStatusAndProfileButton>
            <UserStatus>
              <Count>
                <CountText>2070</CountText>
                <Text>게시물</Text>
              </Count>
              <Count>
                <CountText>100</CountText>
                <Text>팔로워</Text>
              </Count>
              <Count>
                <CountText>100</CountText>
                <Text>팔로잉</Text>
              </Count>
            </UserStatus>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('ProfileEdit')}>
              <ProfileEditButton>프로필 수정</ProfileEditButton>
            </TouchableHighlight>
          </UserStatusAndProfileButton>
        </Header>
        <ProfileDescriptionView>
          <Text style={{ fontWeight: 'bold' }}>TaeHee Kim</Text>
          <Text>Web Developer</Text>
          <Text>Bassist</Text>
          <Text>Longboard Rider</Text>
          <Text>github.com/rotoshine</Text>
        </ProfileDescriptionView>
        <Button title="Login" onPress={() => this.props.navigation.navigate('Login')}/>
        <Button title="Logout" onPress={() => this.logout()}/>
      </ProfileView>
    );
  }
}