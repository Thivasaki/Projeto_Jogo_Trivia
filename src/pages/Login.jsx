import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <LoginForm { ...this.props } />
    );
  }
}

