import { REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
};

const question = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      response_code: action.data.response_code,
      results: action.data.results,
    };
  default:
    return state;
  }
};

export default question;
