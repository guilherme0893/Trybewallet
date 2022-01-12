// com base no course

const url = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = () => fetch(url)
  .then((response) => response.json())
  .then((data) => data);

export default getCurrencies;
