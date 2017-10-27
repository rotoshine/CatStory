import React, { Component } from 'react';
import { Alert, TextInput, Image, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components/native';
import Spinner from 'react-native-loading-spinner-overlay';

import { loadUser } from '../../utils/authUtils';

import { createStory } from '../../apis/storyApi';

const { alert } = Alert;

const FormView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextInputView = styled.View`
  display: flex;
  flex-direction: row;
`;
export default class CreateStoryScreen extends Component {
  static navigationOptions = {
    title: 'Create New Story'
  };

  constructor (props) {
    super(props);

    this.state = {
      isFetching: false,
      user: null,
      content: null
    };
  }

  componentDidMount () {
    this.loadUser();
  }

  async asyncSetState(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async loadUser () {
    // TODO: redux 붙이자
    const user = await loadUser();
    this.setState({ user });
  }

  handleCreatePress = async () => {
    await this.asyncSetState({ isFetching: true });
    const { user, content } = this.state;
    const { uid } = user;
    const { params } = this.props.navigation.state;

    const newStory = {
      userUid: uid,
      name: user.name,
      content: content,
      imageUri: params.selectedImageUri
    };

    if (await createStory(newStory)) {
      this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SelectMedia'})
          ]
        })
      );
      this.props.navigation.navigate('TimelineTab', { refresh: true });
    } else {
      alert('뭔가 문제가 있습니다!!')
    }
    await this.asyncSetState({ isFetching: false });
  };

  render() {    
    const { isFetching, content } = this.state;
    const { params } = this.props.navigation.state;

    return (
      <FormView>
        <Spinner visible={isFetching} />
        <TextInputView>
          <Image source={{uri: params.selectedImageUri}} style={{width: 100, height: 100}} />
          <TextInput style={{flex: 1}} value={content} placeholder="사진에 대한 설명을 적어주세요!" onChangeText={(content) => this.setState({ content })} />
        </TextInputView>
       <Button title="Upload" accessibilityLabel="upload new story." onPress={this.handleCreatePress}/>
      </FormView>
    );
  }
}