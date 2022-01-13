import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor(props) {
  //   super(props);

  //   // this.getTotalValue = this.getTotalValue.bind(this);
  // }

  // getTotalValue() {
  //   const { expenses } = this.props;
  //   // console.log(expense); --> tá vindo vazio !!
  //   const totalValue = expenses.reduce((acc, value) => {
  //     acc += acc + value;
  //     return totalValue;
  //   });
  //   console.log('eu sou o reduce!');
  // }

  render() {
    // const { expenseValues } = this.props;
    // console.log(expenseValues);
    // console.log('sou a expenses');
    // const totalValue = this.getTotalValue();
    const BRL = 'BRL';
    const { email } = this.props;
    return (
      <header>
        <h1>Trybewallet</h1>
        <h3
          data-testid="email-field"
        >
          {`${email}`}
        </h3>
        <h3
          data-testid="total-field"
        >
          Despesa total:
          {/* { totalValue } */}
        </h3>
        <h3
          data-testid="header-currency-field"
        >
          {BRL}
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
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(Header);
