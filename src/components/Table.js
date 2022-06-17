import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsXSquareFill } from 'react-icons/bs';
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
    const backGroundColor = 'rgb(212 212 216)';
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
      <div className="mt-5 mb-4 flex justify-center items-center">
        <table className="table-fixed">
          <thead className="">
            <tr
              className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-black"
            >
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Descrição
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Tag
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Método de pagamento
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Valor
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Moeda de conversão
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Câmbio utilizado
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-left bg-green-800
                 text-white border-white"
              >
                Valor convertido
              </th>
              <th
                className="px-6 text-center align-middle border-2 border-solid py-3
                  text-xs uppercase whitespace-nowrap font-bold text-left
                    bg-green-800 text-white border-white"
              >
                Excluir
              </th>
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
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {expense.tag}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {expense.description}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {expense.method}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {expense.value}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {expense.exchangeRates[expense.currency].name.split('/', 1)}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {
                        Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center border-2 border-solid
                        border-stone bg-stone-300"
                    >
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)
                          * Number(expense.value).toFixed(1))
                      }
                    </td>
                    {/* <td className="text-center border-2 border-solid
                      border-white bg-slate-200">Real</td> */}
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="border-2 ml-2 text-center border-2
                        border-solid border-stone bg-white"
                    >
                      <button
                        className="p-2"
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.removeExpenseFromTable(expense.id) }
                      >
                        <BsXSquareFill fill="red" />
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
