import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleLogout = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleLogout }
        >
          Logout
        </button>
      </section>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Ranking;
