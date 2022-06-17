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
      <nav className="mt-3 flex justify-center items-center mx-4 mb-4">
        <table className="table-fixed hover:table-fixed w-full">
          <thead className="">
            <tr
              className="px-6 align-middle border-2 border-solid py-3 text-xs uppercase
                 whitespace-nowrap font-bold text-center bg-green-800
                 text-white border-black"
            >
              <th
                className="px-6 align-middle border-2 border-solid py-3
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white text-sm"
              >
                Description
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-sm
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white"
              >
                Tag
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-sm
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white"
              >
                Payment method
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-sm
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white"
              >
                Value
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-sm
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white"
              >
                Currency
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-sm
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white"
              >
                Exchange rate
              </th>
              <th
                className="px-6 align-middle border-2 border-solid py-3 text-sm
                 whitespace-nowrap font-bold bg-green-800
                 text-white border-white"
              >
                Converted value
              </th>
              <th
                className="px-6 align-middle border-2 border-solid
                  text-sm whitespace-nowrap font-bold
                    bg-green-800 text-white border-white"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses !== [] && (
                expenses.map((expense) => (
                  <tr key={ expense.id }>
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
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="border-2 ml-2 text-center
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
      </nav>
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
