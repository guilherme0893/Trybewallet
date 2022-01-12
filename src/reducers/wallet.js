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
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE: {
    return {
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.value,
        description: action.description,
        currency: action.currency,
        method: action.method,
        tag: action.tag,
        exchangeRates: action.exchangeRates,
      }],
    };
  }
  case REQUEST_API:
    return { ...state };
  case GET_CURRENCIES_SUCESS: {
    const { currency } = action;
    delete currency.USDT;
    return { ...state, currencies: currency };
  }
  case GET_CURRENCIES_FAIL: {
    return { ...state, error: action.error };
  }
  default:
    return state;
  }
};

export default wallet;
