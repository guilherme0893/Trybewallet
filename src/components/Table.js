import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    // console.log(this.state);
    // console.log(currencies);
    console.log(expenses);
    return (
      <div>
        {/* the ideia of table ---> https://www.w3schools.com/tags/tag_table.asp */}
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
          {/* source of the following organization of tbody and tr and td -- some changes were made in the usage of tbody
          https://stackoverflow.com/questions/39914455/react-validatedomnesting-text-cannot-appear-as-a-child-of-tr
          https://stackoverflow.com/questions/61498491/how-to-fix-validatedomnesting-td-cannot-appear-as-a-child-of-tbody-an */}
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
                  </tr>
                ))
              )
            }
          </tbody>
          {/* <tbody>
            <tr>
              <th>Teste</th>
            </tr>
          </tbody> */}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  // currencies: state.wallet.currencies,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
