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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Tag
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Payment method
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Currency
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Exchange rate
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Converted value
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses !== [] && (
                expenses.map((expense) => (
                  <tr
                    key={ expense.id }
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 text-dark font-bold"
                    >
                      {expense.tag}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 font-bold"
                    >
                      {expense.description}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 font-bold"
                    >
                      {expense.method}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 font-bold"
                    >
                      {expense.value}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 font-bold"
                    >
                      {expense.exchangeRates[expense.currency].name.split('/', 1)}
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 font-bold"
                    >
                      {
                        Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4 font-bold"
                    >
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)
                          * Number(expense.value).toFixed(1))
                      }
                    </td>
                    <td
                      style={ { backgroundColor: backGroundColor } }
                      className="text-center px-6 py-4"
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
