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
      method: '',
      tag: '',
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleAddValue = this.handleAddValue.bind(this);
  }

  componentDidMount() {
    const { getCurrencyThunkAct } = this.props;
    getCurrencyThunkAct();
  }

  handleAddValue = async (event) => {
    event.preventDefault();
    const { getCurrencyThunkAct, addExpenseValueAct } = this.props;
    getCurrencyThunkAct();
    await addExpenseValueAct(this.state);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
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

    const coinControl = 'USDT';
    const currenciesForExchange = currencies
      .filter((currencyControl) => currencyControl !== coinControl);

    return (
      <div className="flex justify-center items-center mt-2">
        <form className="border-4 p-1 border-green-800 ">
          <label className="mr-2" htmlFor="value">
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
          <label className="mr-2" htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label className="mr-2" htmlFor="currency">
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleOnInputChange }
            >
              {currenciesForExchange.length > 0
                && currenciesForExchange.map((currencyForExchange) => (
                  <option
                    data-testid={ currencyForExchange }
                    key={ currencyForExchange }
                    value={ currencyForExchange }
                  >
                    { currencyForExchange }
                  </option>
                ))}
              <option value="">Selecione a moeda</option>
            </select>
          </label>
          <select
            className="mr-2"
            data-testid="method-input"
            name="method"
            onChange={ this.handleOnInputChange }
            value={ method }
          >
            <option value="">Selecione pagamento </option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <label className="mr-2" htmlFor="tag">
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleOnInputChange }
            >
              <option value="">Selecione a tag</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          className="border-4 p-1 border-green-800 bg-green-900 text-white"
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
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyThunkAct: () => dispatch(getCurrencyThunk()),
  addExpenseValueAct: (payload) => dispatch(addExpenseValue(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  addExpenseValueAct: PropTypes.func.isRequired,
  getCurrencyThunkAct: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
