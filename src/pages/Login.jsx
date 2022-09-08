import React, { Component } from 'react';
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
        </form>
      </div>
    );
  }
}
