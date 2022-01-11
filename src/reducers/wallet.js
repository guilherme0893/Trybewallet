// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  REQUEST_API,
  GET_CURRENCIES_SUCESS,
  GET_CURRENCIES_FAIL,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state };
  case REQUEST_API: {
    return { ...state, isFetching: true };
  }
  case GET_CURRENCIES_SUCESS: {
    const { currency } = action;
    return { ...state, currencies: currency };
  }
  case GET_CURRENCIES_FAIL: {
    return { ...state, isFetching: false, error: action.error };
  }
  default:
    return state;
  }
};

export default wallet;
