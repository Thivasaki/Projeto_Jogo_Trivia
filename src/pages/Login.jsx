import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disableButton: true,
    };
  }

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

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
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
          >
            Play

          </button>
          <button onClick={ this.handleClick } type="button" data-testid="btn-settings">
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
