import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseValue, getCurrencyThunk } from '../actions/index';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleAddValue = this.handleAddValue.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    // const { getCurrencies } = this;
    this.getCurrencies();
  }

  getCurrencies() {
    const { getCurrencyThunkAct } = this.props;
    // const { exchangesRates } = this.state;
    getCurrencyThunkAct();
    // console.log(getCurrencyThunkAct());
  }

  handleAddValue(event) {
    event.preventDefault();

    const { getCurrencyThunkAct } = this.props;

    getCurrencyThunkAct().then(() => {
      const {
        state: { value, description, currency, tag, method },
        props: { addExpenseValueAct, currencies },
      } = this;

      const defaultExpense = {
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currencies,
      };

      addExpenseValueAct(defaultExpense);

      this.setState({
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      });
    });
  }

  handleOnInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value });
  }

  render() {
    const {
      value,
      currency,
      method,
      description,
      tag,
    } = this.state;

    const {
      currencies,
    } = this.props;

    delete currencies.USDT;

    // console.log(currencies);
    // console.log(exchangesRates);

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
              // type="number"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleOnInputChange }
            >
              {currenciesForExchange.map((currencyForExchange) => (
                <option
                  data-testid={ currencyForExchange }
                  key={ `currency-${currenciesForExchange}` }
                  value={ currencyForExchange }
                >
                  { currencyForExchange }
                </option>
              ))}
            </select>
          </label>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleOnInputChange }
            value={ method }
          >
            <option value="defaultSelect" disabled hidden>Método de pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
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
  // expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyThunkAct: () => dispatch(getCurrencyThunk()),
  addExpenseValueAct: (expense) => dispatch(addExpenseValue(expense)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  // expenses: PropTypes.number.isRequired,
  addExpenseValueAct: PropTypes.func.isRequired,
  getCurrencyThunkAct: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
