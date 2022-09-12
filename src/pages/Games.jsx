import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import { answerQuestion, gameOver } from '../redux/actions';
import './Games.css';
import RankingButton from '../components/RankingButton';
import PlayAgainButton from '../components/PlayAgainButton';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      finishQuestion: false,
    };
  }

  async componentDidMount() {
    const { history, code } = this.props;
    const invalidToken = 3;

    if (code === invalidToken) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  shuffleArray = (arr) => {
    // site hora de codar: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  answerQuestion = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(answerQuestion());
    this.setState({ finishQuestion: true });
  };

  nextQuestion = () => {
    const { history, dispatch } = this.props;
    const { questionNumber } = this.state;

    if (questionNumber === Number('4')) {
      dispatch(gameOver());
    }
    if (questionNumber === Number('5')) {
      history.push('/feedback');
    } else {
      const nextQuestion = questionNumber + 1;
      this.setState({ questionNumber: nextQuestion });
    }
  };

  render() {
    const { email, name, gameInfo,
      disableButton, isAnswered, isGameFinished } = this.props;
    const { questionNumber, finishQuestion } = this.state;
    const hash = md5(email).toString();
    let getEntries = [];
    if (gameInfo.length && isGameFinished === false) {
      const convertInfo = gameInfo.map((answer) => {
        if (answer.incorrect_answers.length === 1) {
          return ({
            [answer.correct_answer]: true,
            [answer.incorrect_answers]: false,
          });
        }
        return ({
          [answer.correct_answer]: true,
          [answer.incorrect_answers[0]]: false,
          [answer.incorrect_answers[1]]: false,
          [answer.incorrect_answers[2]]: false,
        });
      })[questionNumber];
      getEntries = Object.entries(convertInfo);
      console.log(isGameFinished);
    }
    return (
      <div>
        <header className="header">
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
        { gameInfo !== undefined && gameInfo
          .map((e) => (
            <div key={ e.question }>
              <span data-testid="question-category">{ e.category }</span>
              <span data-testid="question-text">{ e.question }</span>
            </div>
          ))[questionNumber]}
        <section data-testid="answer-options">
          { isGameFinished === false
            ? this.shuffleArray(getEntries).map((answer, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ answer[1] === true
                  ? 'correct-answer' : `wrong-answer-${index - 1}` }
                disabled={ disableButton }
                className={ isAnswered && (answer[1]
                  ? 'correct-answer' : 'incorrect-answer') }
                onClick={ this.answerQuestion }
              >
                {answer[0]}
              </button>
            )) : <h2>O JOGO ACABOU</h2>}
        </section>
        <Timer disableButton={ disableButton } />
        <RankingButton />
        <PlayAgainButton />
        {finishQuestion === true && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  gameInfo: state.question.results,
  code: state.question.response_code,
  disableButton: state.question.disableButtons,
  isAnswered: state.question.isAnswered,
  isGameFinished: state.question.isGameFinished,
});

Games.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  gameInfo: PropTypes.shape(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Games);
