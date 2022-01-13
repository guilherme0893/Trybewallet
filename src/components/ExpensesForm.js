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
      method: 'Dinheiro',
      tag: 'Alimentação',
      // defaultExpense: {
      //   value: '0',
      //   description: '',
      //   currency: 'USD',
      //   method: 'Dinheiro',
      //   tag: 'Alimentação',
      // },
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleAddValue = this.handleAddValue.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    // const { getCurrencies } = this;
    // console.log(this.getCurrencies());
    this.getCurrencies();
  }

  getCurrencies() {
    // Acessado após o mapDispatch -- atenção o nome porque repetiu antes!!
    const { getCurrencyThunk } = this.props;
    // const { exchangesRates } = this.state;
    getCurrencyThunk();
    // this.setState({ exchangesRates: currencies });
    // console.log(currencies);
  }

  handleAddValue(event) {
    event.preventDefault();

    const { getCurrencyThunk } = this.props;

    getCurrencyThunk().then(() => {
      const {
        // state: { value, description, currency, tag, method },
        props: { addExpenseValueAct, currencies },
      } = this;

      delete currencies.USDT;

      const { expenses } = this.props;

      addExpenseValueAct(expenses);
    });
    // this.setState({
    //   value: 0,
    //   description: '',
    //   currency: 'defaultSelect',
    //   method: 'defaultSelect',
    //   tag: 'defaultSelect',
    // });
  }

  handleOnInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value });
  }

  render() {
    // console.log(this.props);

    // const {
    //   defaultExpense: { value, currency, method, description, tag },
    // } = this.state;

    const {
      value, currency, method, description, tag,
    } = this.state;

    const {
      currencies,
    } = this.props;

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
          // onClick={ () => {
          //   getCurrencyThunk().then(() => addExpenseValueAct({ id: 'ola' }));
          // } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyThunk: () => dispatch(getCurrencyThunk()),
  addExpenseValueAct: (expense) => dispatch(addExpenseValueAct(expense)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  expenses: PropTypes.number.isRequired,
  addSpentValue: PropTypes.func.isRequired,
  fetchCurrenciesApi: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
