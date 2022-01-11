// Coloque aqui suas actions
const ADD_USER = 'ADD_USER';

export const addUser = (email) => ({ type: ADD_USER, email });

// a ideia de uma const repetida é para realizar o export da consta acima -- dica do Josué
export const controleDoLint = (payload) => ({ type: ADD_USER, payload });
