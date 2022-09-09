import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAPIQuestions } from '../redux/actions';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    await dispatch(requestAPIQuestions(token));
    // if (questions.results.length === Number('0')) {
    //   history.push('/');
    // }
  }

  render() {
    const { email, name, questions } = this.props;
    // const randomizer = Math.round(Math.random() * Number('4'));
    const { questionNumber } = this.state;
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
        { questions.results !== undefined && questions.results
          .map((e) => (
            <div key={ e.question }>
              <span data-testid="question-category">{ e.category }</span>
              <span data-testid="question-text">{ e.question }</span>
              <section
                data-testid="answer-options"
              >
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  { e.correct_answer }
                </button>
                {e.incorrect_answers
                  .map((ei, i) => (
                    <button
                      type="button"
                      key={ ei }
                      data-testid={ `wrong-answer-${i}` }
                    >
                      { ei }

                    </button>
                  ))}
              </section>
            </div>
          ))[questionNumber]}
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
