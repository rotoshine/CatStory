import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import firebase from 'react-native-firebase';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { saveUser } from '../../utils/authUtils';

const CreateAccountView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const FormItem = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
`;

export default class CreateAccountScreen extends Component {
  static navigationOptions = {
    title: 'Create Account'
  };

  constructor (props) {
    super(props);

    this.state = {
      isFetching: false,
      email: null,
      password: null,
      confirmPassword: null,
      name: null
    };
  }

  async asyncSetState(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async createUser (email, name, password) {
    try {
      await this.asyncSetState({ isFetching: true });
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = Object.assign({}, result.toJSON(), { name });

      // 부가정보 저장처리
      const db = firebase.database().ref();
      await db.child('users').child(user.uid).set(user);

      await saveUser(user);
      await this.asyncSetState({ isFetching: false });

      this.props.navigation.navigate('TimelineTab');

    } catch (e) {
      console.error(e);
    }

  }

  handleCreateAccountButtonPress = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { email, password, confirmPassword, name } = this.state;
    const { alert } = Alert;
    if (!email || !emailRegex.test(email)) {
      alert('올바른 메일 주소를 입력해주세요.')
    } else if (!password || password.length < 8) {
      alert('비밀번호는 8자 이상으로 입력해주세요.')
    } else if (password !== confirmPassword) {
      alert('비밀번호를 다시 확인해주세요.')
    } else {
      this.createUser(email, name, password);
    }
  };

  render () {
    const { isFetching, email, name, password, confirmPassword } = this.state;

    return (
      <CreateAccountView>
        <Spinner visible={isFetching} />
        <FormItem>
          <FormLabel>email</FormLabel>
          <FormInput value={email} keyboardType="email-address" placeholder="email"
                     onChangeText={(email) => this.setState({ email })}/>
        </FormItem>
        <FormItem>
          <FormLabel>name</FormLabel>
          <FormInput value={name} placeholder="name"
                     onChangeText={(name) => this.setState({ name })}/>
        </FormItem>
        <FormItem>
          <FormLabel>password</FormLabel>
          <FormInput value={password} secureTextEntry placeholder="password"
                     onChangeText={(password) => this.setState({ password })}/>
        </FormItem>
        <FormItem>
          <FormLabel>password 확인</FormLabel>
          <FormInput value={confirmPassword} secureTextEntry placeholder="password"
                     onChangeText={(confirmPassword) => this.setState({ confirmPassword })}/>
        </FormItem>
        <Button title="생성" onPress={this.handleCreateAccountButtonPress}/>
      </CreateAccountView>
    );
  }
}