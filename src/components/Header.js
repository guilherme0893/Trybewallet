import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <h1>Trybewallet</h1>
        <h3
          data-testid="email-field"
        >
          {`email ${user.email}`}
        </h3>
        <h3
          data-testid="total-field"
        >
          Despesa total: 0
        </h3>
        <h3
          data-testid="header-currency-field"
        >
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => state;

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
