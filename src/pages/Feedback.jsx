import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayAgainButton from '../components/PlayAgainButton';
import RankingButton from '../components/RankingButton';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    console.log(assertions);
    const TRES = 3;
    return (
      <section>
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
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Feedback);
