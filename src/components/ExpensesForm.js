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
      <div
        className="flex justify-center items-center mt-2"
        style={ {
          backgroundColor: '#9921e8',
          backgroundImage: 'linear-gradient(315deg, #cc99cc, #999999 75%)',
        } }
      >
        <form className="border-4 pr-3 pl-3 pt-2 pb-2 border-green-800 bg-gray-300">
          <label className="mr-2" htmlFor="value">
            Value
            <input
              className="ml-4 text-center bg-gray-200 border-b-4 focus:outline-none
                focus:border-purple-600 transition duration-500"
              data-testid="value-input"
              // type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label className="mr-2" htmlFor="description">
            Description
            <input
              className="ml-4 text-center bg-gray-200 focus:outline-none
                border-b-4 focus:border-purple-600 transition duration-500"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label className="mr-2" htmlFor="currency">
            <select
              className="ml-4 text-center bg-gray-200 focus:outline-none
                border-b-4 focus:border-purple-600 transition duration-500"
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
              {/* <option value="">Selecione a moeda</option> */}
            </select>
          </label>
          <select
            className="ml-4 text-center bg-gray-200 focus:outline-none
              border-b-4 focus:border-purple-600 transition duration-500"
            data-testid="method-input"
            name="method"
            onChange={ this.handleOnInputChange }
            value={ method }
          >
            <option
              value=""
              selected
              disabled
              hidden
              className="bg-gray-200"
            >
              Choose payment method
            </option>
            <option value="Dinheiro" className="bg-gray-200">Dinheiro</option>
            <option value="Cartão de crédito" className="bg-gray-200">
              Credit
            </option>
            <option value="Cartão de débito" className="bg-gray-200">
              Debit
            </option>
          </select>
          <label className="mr-2 bg-gray-200" htmlFor="tag">
            <select
              className="ml-4 text-center bg-gray-200 focus:outline-none
                border-b-4 focus:border-purple-600 transition duration-500"
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleOnInputChange }
            >
              <option
                value=""
                selected
                disabled
                hidden
                className="bg-gray-200"
              >
                Choose the tag
              </option>
              <option value="Alimentação" className="bg-gray-200">Food</option>
              <option value="Lazer" className="bg-gray-200">Leisure</option>
              <option value="Trabalho" className="bg-gray-200">Work</option>
              <option value="Transporte" className="bg-gray-200">Transport</option>
              <option value="Saúde" className="bg-gray-200">Health</option>
            </select>
          </label>
          <button
            className="ml-2 bg-white hover:bg-purple-400 hover:text-white
              text-dark font-bold py-2 px-4 border border-purple-300
                rounded transtion duration-500"
            type="button"
            onClick={ this.handleAddValue }
          >
            Add expense
          </button>
        </form>
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
