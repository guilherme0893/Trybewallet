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
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [action.expenses] };
  // {
  //   const expense = [...state.expenses, action.expenses]
  //     .map((expenseValue, id) => ({ id, ...expenseValue }));
  //   return { ...state, expense };
  // }
  case REQUEST_API:
    return { ...state };
  case GET_CURRENCIES_SUCCESS: {
    const { currencies } = action;
    delete currencies.USDT;
    return { ...state, expenses: [action.expenses], currencies };
  }
  case GET_CURRENCIES_FAIL: {
    return { ...state, error: action.error };
  }
  default:
    return state;
  }
};

export default wallet;
