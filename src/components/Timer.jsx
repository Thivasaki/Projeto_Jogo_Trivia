import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimeIsOverMessage from './TimeIsOverMessage';
import { disableButtons } from '../redux/actions';

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

  render() {
    const { counter, intervalId } = this.state;

    if (counter === 0) {
      clearInterval(intervalId);
    }
    return (
      <div>
        {counter === 0 ? <TimeIsOverMessage /> : <h1>{counter}</h1> }
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Timer);
