import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disableButton: true,
    };
  }

  fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, this.handleValidation);
  };

  handleValidation = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  handleClick = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    const token = await this.fetchToken();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { email, name, disableButton } = this.state;
    return (

      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <input
            id="name"
            value={ name }
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            autoComplete="off"
          />
          <input
            id="email"
            value={ email }
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            autoComplete="off"
          />
          <button
            disabled={ disableButton }
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
