import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getTotalValue = this.getTotalValue.bind(this);
  }

  getTotalValue() {
    const { expenses } = this.props;
    // console.log(expense);
    const totalValue = expenses.reduce((acc, value) => {
      let { total } = value;
      total = parseFloat(total);

      // realizar a conversão
      if (value.currency !== 'BRL') {
        // *= indicado pelo próprio lint
        value *= parseFloat(value.exchangeRates[value.currency].ask);
      }
      return acc + total;
    }, 0);
    return totalValue;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>Trybewallet</h1>
        <h3 data-testid="email-field">
          { email }
        </h3>
        <h3 data-testid="total-field">
          Despesa total:
          { this.getTotalValue() }
        </h3>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
