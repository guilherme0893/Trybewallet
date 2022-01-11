import React, { Component } from 'react';
import { addExpenseValueAct } from '../actions/index';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'defaultSelect',
      paymentMethod: 'defaultSelect',
      tag: 'defaultSelect',
      // o uso do defaultSelect segue o link abaixo
      // https://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
    };

    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    // this.handleAddValue = this.handleAddValue.bind(this);
  }

  handleOnInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // handleAddValue() {
  //   addExpenseValueAct
  // }

  render() {
    const {

      value,
      description,
      currency,
      paymentMethod,
      tag,

    } = this.state;

    return (
      <div>
        <form>
          <label
            htmlFor="value-input"
          >
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onClick={ this.handleOnInputChange }
            />
          </label>
          <label
            htmlFor="description-input"
          >
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
            />
          </label>
          <label
            htmlFor="currency-input"
          >
            Moeda:
            <select
              data-testid="currency-input"
              type="number"
              name="currency"
              id="currency"
              value={ currency }
            >
              <option
                value="defaultSelect"
              >
                Selecione a moeda
              </option>
            </select>
          </label>
          <label
            htmlFor="method-input"
          >
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              value={ paymentMethod }
            >
              <option
                value="defaultSelect"
              >
                Selecione o método de pagamento
              </option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="tag-input"
          >
            Tag:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
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
          // onClick={ this.handleAddValue }
        >
          Adicionar despesas
        </button>
      </div>
    );
  }
}

export default ExpensesForm;
