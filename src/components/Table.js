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
        <table className="table-fixed">
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
                    <td className="text-center">
                      {expense.tag}
                    </td>
                    <td className="text-center">{expense.description}</td>
                    <td className="text-center">{expense.method}</td>
                    <td className="text-center">{expense.value}</td>
                    <td className="text-center">{expense.exchangeRates[expense.currency].name.split('/', 1)}</td>
                    <td className="text-center">
                      {
                        Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td className="text-center">
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)
                          * Number(expense.value).toFixed(1))
                      }
                    </td>
                    <td className="text-center">Real</td>
                    <div className="border-2 ml-2 bg-red-300">
                      <button
                        className="p-2"
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.removeExpenseFromTable(expense.id) }
                      >
                        Deletar despesa
                      </button>
                    </div>
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
