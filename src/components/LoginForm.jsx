import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../pages/LoginAssets/LogoTrivia.svg';
import { addNameEmail, requestAPIQuestions } from '../redux/actions';

class LoginForm extends Component {
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    const token = await this.fetchToken();
    localStorage.setItem('token', token);
    dispatch(addNameEmail({
      name,
      email,
    }));
    const localStoreToken = localStorage.getItem('token');
    await dispatch(requestAPIQuestions(localStoreToken));
    history.push('/games');
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { email, name, disableButton } = this.state;
    return (

      <div>
        <img src={ logo } className="Logo_Trivia_Login" alt="logo" />
        <form>
          <div className="Box_Branco">{}</div>
          <div className="Forms_Inputs">
            <input
              id="name"
              value={ name }
              type="text"
              placeholder="What is your name?"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              autoComplete="off"
            />
            <input
              id="email"
              value={ email }
              type="email"
              placeholder="What is your email?"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              autoComplete="off"
            />
          </div>
          <div className="Buttons_Display">
            <button
              disabled={ disableButton }
              className="Button"
              type="submit"
              data-testid="btn-play"
              onClick={ this.handleSubmit }
            >
              PLAY

            </button>
            <button
              className="Button"
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleClick }
            >
              SETTINGS
            </button>
          </div>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(LoginForm);
