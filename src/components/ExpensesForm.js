/* eslint-disable react/jsx-max-depth */
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
      <form
        className="flex flex-col items-center border-4
          border-green-800 bg-gray-300 hover:outline-none
          hover:border-purple-600 transition duration-500"
      >
        <div
          className="flex flex-col items-center md:w-full
            lg:flex lg:flex-row lg:justify-around lg:p-2"
        >
          <label className="flex my-2" htmlFor="value">
            Value
            <input
              className="text-center bg-gray-200 border-b-4 focus:outline-none
                focus:border-purple-600 transition duration-500 w-40 ml-1"
              data-testid="value-input"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label className="flex my-2" htmlFor="description">
            Description
            <input
              className="text-center bg-gray-200 focus:outline-none w-40 ml-1
                border-b-4 focus:border-purple-600 transition duration-500"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleOnInputChange }
            />
          </label>
          <label className="flex my-2" htmlFor="currency">
            <select
              className="text-center bg-gray-200 focus:outline-none
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
            </select>
          </label>
          <select
            className="flex my-2 text-center bg-gray-200 p-1
              focus:outline-none border-b-4 focus:border-purple-600
                transition duration-500"
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
            <option value="Money" className="bg-gray-200">Money</option>
            <option value="Credit" className="bg-gray-200">
              Credit
            </option>
            <option value="Debit" className="bg-gray-200">
              Debit
            </option>
          </select>
          <label
            className="bg-gray-200 my-2"
            htmlFor="tag"
          >
            <select
              className="text-center bg-gray-200 focus:outline-none p-1
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
            className="bg-white hover:bg-purple-400 hover:text-white
              text-dark font-bold p-2 border border-purple-300 my-2
                rounded transtion duration-500"
            type="button"
            onClick={ this.handleAddValue }
          >
            Add expense
          </button>
        </div>
      </form>
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
