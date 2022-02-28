import {
  ADD_EXPENSE,
  REQUEST_API,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAIL,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  editing: {},
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
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      editing: {},
      expenses: state.expenses.map((expense) => (
        expense.id === action.id ? action.expense : expense)),
    };
  default:
    return state;
  }
};

export default wallet;
