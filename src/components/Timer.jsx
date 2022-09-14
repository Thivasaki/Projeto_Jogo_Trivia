import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableButtons, addTimer } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 30,
      intervalId: 0,

    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        intervalId,
        counter: prevState.counter - 1,
      }));
    }, oneSecond);
  }

  componentDidUpdate() {
    const { counter } = this.state;
    const { dispatch } = this.props;
    if (counter === 0) dispatch(disableButtons());
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  stopTimer = () => {
    const { intervalId, counter } = this.state;
    const { dispatch } = this.props;
    clearInterval(intervalId);
    dispatch(addTimer(counter));
  };

  render() {
    const { counter, intervalId } = this.state;
    const { func } = this.props;
    func(this.stopTimer);

    if (counter === 0) {
      clearInterval(intervalId);
    }
    return (
      <div>
        {counter === 0 ? <h2>Time Is Over</h2> : <h1 data-testid="timer">{counter}</h1> }
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
};
export default connect()(Timer);
