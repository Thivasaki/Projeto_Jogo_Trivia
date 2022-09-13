import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    // console.log(storage);
    this.setState({
      ranking: storage,
    });
  }

  handleLogout = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { email } = this.props;
    const { ranking } = this.state;
    const hash = md5(email).toString();
    console.log(ranking);
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {
            ranking.sort((a, b) => b.score - a.score).map((player, index) => (
              <li key={ index }>
                <img
                  data-testid="header-profile-picture"
                  src={ `https://www.gravatar.com/avatar/${hash}` }
                  alt="gravatar"
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  {player.name}
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  {player.score}
                </p>
              </li>
            ))
          }
        </ul>
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

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Ranking.propTypes = {
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Ranking);
