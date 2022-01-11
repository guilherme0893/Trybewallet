// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addUserAct = (email) => ({
  type: ADD_USER,
  email,
});

export const addExpenseValueAct = (spentValue) => ({
  type: ADD_EXPENSE,
  spentValue,
});
