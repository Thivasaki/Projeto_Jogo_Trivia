import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayAgainButton extends Component {
  render() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
        >
          Play Again
        </button>
      </Link>
    );
  }
}

export default PlayAgainButton;
