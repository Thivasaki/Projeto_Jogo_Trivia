import { REQUEST_QUESTIONS, DISABLE_BUTTONS, ADD_TIMER } from '../actions';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
  disableButtons: false,
  timer: 0,
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
  case ADD_TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  default:
    return state;
  }
};

export default question;
