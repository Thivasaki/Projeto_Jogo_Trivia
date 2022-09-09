import { ADD_NAME_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME_EMAIL:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  default:
    return state;
  }
};

export default player;
