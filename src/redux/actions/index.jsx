export const ADD_NAME_EMAIL = 'ADD_NAME_EMAIL';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const DISABLE_BUTTONS = 'DISABLE_BUTTONS';

export const addNameEmail = (payload) => ({
  type: ADD_NAME_EMAIL,
  payload,
});

export const requestAPIQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  dispatch({
    type: REQUEST_QUESTIONS,
    data,
  });
};

export const disableButtons = () => ({
  type: DISABLE_BUTTONS,
  payload: true,

});
