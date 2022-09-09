import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAPIQuestions } from '../redux/actions';

class Games extends Component {
  async componentDidMount() {
    const { dispatch, questions, history } = this.props;
    const token = localStorage.getItem('token');
    await dispatch(requestAPIQuestions(token));
    if (questions.results.length === Number('0')) {
      history.push('/');
    }
  }

  render() {
    const { email, name, questions } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="gravatar"
          />
          <span data-testid="header-player-name">
            { name }
          </span>
          <span data-testid="header-score">
            Score: 0
          </span>
        </header>
        { questions.results !== undefined && questions.results.map((e) => (
          <div key={ e.question }>
            <span>{ e.question }</span>
            <span>{ e.correct_answer }</span>
            {e.incorrect_answers.map((ei) => (
              <span key={ ei }>{ ei }</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  questions: state.question.question,
});

Games.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  questions: PropTypes.shape(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Games);
