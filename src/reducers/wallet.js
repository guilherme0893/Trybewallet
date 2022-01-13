// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  REQUEST_API,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAIL,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case GET_CURRENCIES_SUCCESS: {
    const { currencies } = action;
    delete currencies.USDT;
    return { ...state, currencies: currencies };
  }
  case GET_CURRENCIES_FAIL: {
    return { ...state };
  }
  case ADD_EXPENSE: {
    const expenses = [...state.expenses, action.expenses]
      .map((expense, id) => ({ id, ...expense }));
    return { ...state, expenses };
  }
  default:
    return state;
  }
};

export default wallet;
