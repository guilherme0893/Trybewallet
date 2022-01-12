import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
          {/* <tbody>
            <tr>Teste</tr>
            {expenses.map((expense) => (
              <td>{expense.</td>
            ))}
          </tbody> */}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Table);
