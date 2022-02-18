// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  REQUEST_API,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAIL,
  REMOVE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
      exchangeRates: action.payload,
    };
  case GET_CURRENCIES_FAIL:
    return {
      ...state,
      error: 'Fetch API failed!',
    };
  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          exchangeRates: state.exchangeRates,
          description: action.payload.description,
          value: action.payload.value,
          currency: action.payload.currency,
          method: action.payload.method,
          tag: action.payload.tag,
        }],
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: action.payload,
    };
  }
  default:
    return state;
  }
};

export default wallet;
