import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
