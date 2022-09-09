import { REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  question: {},
};

const question = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      question: action.payload,
    };
  default:
    return state;
  }
};

export default question;
