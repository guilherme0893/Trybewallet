import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getTotalValue = this.getTotalValue.bind(this);
  }

  getTotalValue() {
    const { expenseValues } = this.props;
    console.log(expenseValues);
    return expenseValues.reduce((acc, value) => {
      acc += value.value;
      return acc;
    }, 0);
  }

  render() {
    // const { expenseValues } = this.props;
    // console.log(expenseValues);
    // console.log('sou a expenses');
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
          { this.getTotalValue() }
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
  expenseValues: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.objectOf(PropTypes.string).isRequired,
  expenseValues: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(Header);
