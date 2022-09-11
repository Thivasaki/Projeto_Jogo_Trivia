import { REQUEST_QUESTIONS, DISABLE_BUTTONS } from '../actions';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  questionsButtons: false,
};

const question = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      response_code: action.data.response_code,
      results: action.data.results,
      questionsButtons: false,
    };
  case DISABLE_BUTTONS:
    return {
      ...state,
      questionsButtons: action.payload,
    };
  default:
    return state;
  }
};

export default question;
