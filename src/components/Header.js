import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultCurrency: 'BRL',
    };

    this.getTotalValue = this.getTotalValue.bind(this);
  }

  getTotalValue() {
    const { expenses } = this.props;
    const totalValue = expenses
      .map(({ exchangeRates, currency, value }) => (exchangeRates[currency].ask) * value);
    if (totalValue !== []) {
      const totalValue2 = totalValue.reduce((acc, value) => acc + value, 0);
      return totalValue2.toFixed(2);
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    const { defaultCurrency } = this.state;
    return (
      <nav
        className="bg-gray-200 border-b-4 m-auto p-3
          flex flex-col text-center
            lg:flex md:flex lg:flex-row
              md:flex-row justify-around"
      >
        <h1
          className="border-b-4 text-2xl lg:text-4xl font-bold mt-3
            hover:outline-none hover:border-purple-600 transition duration-500"
        >
          Trybewallet
        </h1>
        <p data-testid="email-field" className="mt-3 lg:text-3xl text-lg">
          Welcome
          {' '}
          {
            email
          }
        </p>
        <p data-testid="total-field" className="text-xl lg:text-2xl mt-3">
          {`Your total expense is ${this.getTotalValue()}`}
          { defaultCurrency }
        </p>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
