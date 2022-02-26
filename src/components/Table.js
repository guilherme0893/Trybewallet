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
      <div className="mt-5 flex justify-center items-center">
        <table>
          <thead>
            <tr>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Descrição
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Tag
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Método de pagamento
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Moeda
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Câmbio utilizado
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Valor convertido
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Moeda de conversão
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
              >
                Editar/Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses !== [] && (
                expenses.map((expense) => (
                  <tr key={ expense.id }>
                    <td>
                      {expense.tag}
                    </td>
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
