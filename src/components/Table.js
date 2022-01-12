import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        {/* the ideia of table ---> https://www.w3schools.com/tags/tag_table.asp */}
        <table>
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
        </table>
      </div>
    );
  }
}

export default Table;
