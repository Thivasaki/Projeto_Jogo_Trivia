import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { requestAPIQuestions } from '../redux/actions';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
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
    // Essa função foi baseada no exemplo dado no site hora de codar: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const { email, name, gameInfo } = this.props;
    const { questionNumber } = this.state;
    const hash = md5(email).toString();
    let getEntries = [];
    console.log(gameInfo);
    if (gameInfo.length) {
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
      console.log(convertInfo);
      getEntries = Object.entries(convertInfo);
      console.log(getEntries);
    }

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
        { gameInfo !== undefined && gameInfo
          .map((e) => (
            <div key={ e.question }>
              <span data-testid="question-category">{ e.category }</span>
              <span data-testid="question-text">{ e.question }</span>
            </div>
          ))[questionNumber]}
        <section data-testid="answer-options">
          {gameInfo
            ? this.shuffleArray(getEntries).map((answer, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ answer[1] === true
                  ? 'correct-answer' : `wrong-answer-${index - 1}` }
              >
                {answer[0]}
              </button>
            )) : <h1>Carregando</h1>}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  gameInfo: state.question.results,
  code: state.question.response_code,
});

Games.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  gameInfo: PropTypes.shape(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Games);
