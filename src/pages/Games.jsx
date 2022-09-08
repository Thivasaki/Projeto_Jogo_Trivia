import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Games extends Component {
  render() {
    const { email, name } = this.props;
    const hash = md5(email).toString();
    console.log(name);
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
            0
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

Games.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Games);
