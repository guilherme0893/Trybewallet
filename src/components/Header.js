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
        className="bg-gray-200 border-b-4 flex justify-around
         items-center m-auto p-3"
      >
        <div>
          <h1
            className="border-b-4 text-4xl text-center m-auto max-w-lg font-bold mt-3
              hover:outline-none hover:border-purple-600 transition duration-500"
          >
            Trybewallet
          </h1>
        </div>
        <div className="text-3xl">
          <h1 data-testid="email-field">
            Welcome
            {' '}
            {
              email
            }
          </h1>
        </div>
        <div className="text-2xl">
          <h1 data-testid="total-field">
            {`Your total expense is ${this.getTotalValue()}`}
            { defaultCurrency }
          </h1>
        </div>
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
