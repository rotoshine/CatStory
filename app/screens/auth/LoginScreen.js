import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { login } from '../../utils/authUtils';

const LoginView = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormItem = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
`;

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor (props) {
    super(props);

    this.state = {
      isFetching: false,
      email: null,
      password: null
    };
  }

  toggleSpinner (isFetching) {
    return new Promise((resolve) => {
      this.setState({
        isFetching
      }, resolve);
    });
  }

  handleLogin = async () => {
    const { email, password } = this.state;

    await this.toggleSpinner(true);

    if (await login(email, password)) {
      this.props.navigation.navigate('TimelineTab');
    }

    await this.toggleSpinner(false);
  };

  handleCreateAccountButtonPress = () => {
    this.props.navigation.navigate('CreateAccount');
  };

  render () {
    const { isFetching, email, password } = this.state;

    return (
      <LoginView>
        <Spinner visible={isFetching} />
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormInput value={email}
                     keyboardType="email-address"
                     placeholder="email"
                     onChangeText={(email) => this.setState({ email })}
                     onSubmitEditing={() => this.passwordInput.focus()}
          />
        </FormItem>

        <FormItem>
          <FormLabel>password</FormLabel>
          <FormInput ref={(passwordInput) => this.passwordInput = passwordInput }
                     value={password}
                     secureTextEntry
                     placeholder="password"
                     onChangeText={(password) => this.setState({ password })}
                     onSubmitEditing={this.handleLogin}
          />
        </FormItem>
        <Button large title="로그인" buttonStyle={{ width: 200, marginBottom: 10 }} onPress={this.handleLogin}/>
        <Button large title="계정 생성" buttonStyle={{ width: 200 }} onPress={this.handleCreateAccountButtonPress}/>
      </LoginView>
    );
  }
}