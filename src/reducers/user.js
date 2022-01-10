// Esse reducer será responsável por tratar as informações da pessoa usuária
const ADD_USER = 'ADD_USER';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
