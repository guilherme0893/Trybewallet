import getCurrencies from '../services/currencyAPI';

export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const addUserAct = (email) => ({
  type: ADD_USER,
  email,
});

export const addExpenseValue = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const requestCurrencyApi = () => ({
  type: REQUEST_API,
});

const getCurrenciesSuccess = (payload) => ({
  type: GET_CURRENCIES_SUCCESS,
  payload,
});

const getCurrenciesFail = () => ({
  type: GET_CURRENCIES_FAIL,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const getCurrencyThunk = () => (dispatch) => {
  dispatch(requestCurrencyApi());
  return getCurrencies()
    .then((payload) => dispatch(getCurrenciesSuccess(payload)))
    .catch(() => dispatch(getCurrenciesFail()));
};
