import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  render() {
    // const { history } = this.props;
    return (
      <LoginForm { ...this.props } />
    );
  }
}
