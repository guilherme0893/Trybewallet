import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/index';

class Table extends Component {
  constructor(props) {
    super(props);
    this.removeExpenseFromTable = this.removeExpenseFromTable.bind(this);
  }

  removeExpenseFromTable(id) {
    const { expenses, removeExpenses } = this.props;
    const filteredArray = expenses.filter((expense) => expense.id !== id);
    removeExpenses(filteredArray);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses !== [] && (
                expenses.map((expense) => (
                  <tr key={ expense.id }>
                    <td>{expense.tag}</td>
                    <td>{expense.description}</td>
                    <td>{expense.method}</td>
                    <td>{expense.value}</td>
                    <td>{expense.exchangeRates[expense.currency].name.split('/', 1)}</td>
                    <td>
                      {
                        Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)
                          * Number(expense.value).toFixed(2))
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.removeExpenseFromTable(expense.id) }
                      >
                        Deletar despesa
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (payload) => dispatch(removeExpense(payload)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
