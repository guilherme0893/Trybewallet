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
      <header className="text-2xl flex flex-col justify-center items-center mt-2 p-3">
        <div>
          <h3 data-testid="email-field">
            Welcome
            {' '}
            {
              email
            }
          </h3>
        </div>
        <div>
          <h3 data-testid="total-field">
            {`Your total expense is ${this.getTotalValue()}`}
            { defaultCurrency }
          </h3>
        </div>
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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
