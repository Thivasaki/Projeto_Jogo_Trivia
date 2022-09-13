import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import PlayAgainButton from '../components/PlayAgainButton';
import RankingButton from '../components/RankingButton';

class Feedback extends Component {
  render() {
    const { assertions, name, score, email } = this.props;
    const hash = md5(email).toString();
    console.log(assertions);
    const TRES = 3;
    return (
      <section>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="gravatar" />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <p data-testid="feedback-text">
          {assertions < TRES ? 'Could be better...' : 'Well Done!'}
        </p>
        <PlayAgainButton />
        <RankingButton />
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
