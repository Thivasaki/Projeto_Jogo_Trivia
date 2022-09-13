import { ADD_NAME_EMAIL, ADD_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME_EMAIL:
    return {
      ...state, name: action.payload.name, gravatarEmail: action.payload.email, score: 0,
    };

  case ADD_POINTS:
    return {
      ...state,
      score: state.score + action.payload,
    };

  default:
    return state;
  }
};

export default player;
