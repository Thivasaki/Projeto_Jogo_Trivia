import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { addNameEmail } from '../redux/actions';

class Login extends Component {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    dispatch(addNameEmail({
      name,
      email,
    }));
    history.push('/games');
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
            onClick={ this.handleSubmit }
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
