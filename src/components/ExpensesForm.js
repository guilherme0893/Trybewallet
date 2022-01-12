import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseValueAct, getCurrencyThunk } from '../actions/index';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'defaultSelect',
      tag: 'defaultSelect',
      // o uso do defaultSelect segue o link abaixo
      // https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleAddValue = this.handleAddValue.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    // Acessado após o mapDispatch -- atenção o nome porque repetiu antes!!
    const { fetchCurrenciesApi } = this.props;
    fetchCurrenciesApi();
  }

  handleAddValue() {
    // formato das despesas
    // id
    // value
    // description
    // currency
    // method
    // tag
    // exchangesRates:{moedas}

    const { fetchCurrenciesApi } = this.props;

    fetchCurrenciesApi().then(() => {
      const {
        state: { value, description, currency, tag, method },
        props: { currencies, addSpentValue },
      } = this;

      const defaultExpense = {
        value,
        description,
        currency,
        method,
        tag,
        exchangeCurrency: currencies,
      };

      addSpentValue(defaultExpense);

      this.setState({
        value: 0,
        description: '',
        currency: 'defaultSelect',
        method: 'defaultSelect',
        tag: 'defaultSelect',
      });
    });
  }

  handleOnInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value });
  }

  render() {
    // console.log(this.props);

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;

    // console.log(currencies);

    const currenciesForExchange = Object.keys(currencies);

    // console.log(currenciesForExchange);

    return (
      <div>
        <form>
          <label
            htmlFor="value"
          >
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label
            htmlFor="description"
          >
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              type="number"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleOnInputChange }
            >
              {currenciesForExchange.map((currencyForExchange) => (
                <option
                  data-testid={ currencyForExchange }
                  key={ `${currencyForExchange}` }
                  value={ currencyForExchange }
                >
                  { currencyForExchange }
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="method"
          >
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleOnInputChange }
            >
              <option value="defaultSelect">Selecione o método de pagamento</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="tag"
          >
            Tag:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleOnInputChange }
            >
              <option
                value="defaultSelect"
              >
                Selecione uma tag
              </option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.handleAddValue }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesApi: () => dispatch(getCurrencyThunk()),
  addSpentValue: (expense) => dispatch(addExpenseValueAct(expense)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  addSpentValue: PropTypes.func.isRequired,
  fetchCurrenciesApi: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
