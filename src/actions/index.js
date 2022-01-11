// Coloque aqui suas actions
import getCurrencies from '../services/currencyAPI';

export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const addUserAct = (email) => ({
  type: ADD_USER,
  email,
});

export const addExpenseValueAct = (spentValue) => ({
  type: ADD_EXPENSE,
  spentValue,
});

export const requestCurrencyApi = () => ({
  type: REQUEST_API,
});

const getCurrenciesSuccess = (currency) => ({
  type: GET_CURRENCIES_SUCESS,
  currency,
});

const getCurrenciesFail = (error) => ({
  type: GET_CURRENCIES_FAIL,
  error,
});

export const getCurrencyThunk = () => (dispatch) => {
  dispatch(requestCurrencyApi());
  return getCurrencies()
    .then((currencies) => dispatch(getCurrenciesSuccess(currencies)))
    .catch((error) => dispatch(getCurrenciesFail(error)));
};
