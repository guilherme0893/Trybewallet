// com base no course

const url = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = () => (
  fetch(url)
    .then((response) => (response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrencies;
