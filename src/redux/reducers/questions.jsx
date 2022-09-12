import { REQUEST_QUESTIONS, DISABLE_BUTTONS, ANSWER_QUESTION } from '../actions';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  disableButtons: false,
  isAnswered: false,
};

const question = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      response_code: action.data.response_code,
      results: action.data.results,
      disableButtons: false,
      isAnswered: false,
    };
  case DISABLE_BUTTONS:
    return {
      ...state,
      disableButtons: action.payload,
    };
  case ANSWER_QUESTION:
    return {
      ...state,
      isAnswered: true,
    };
  default:
    return state;
  }
};

export default question;
