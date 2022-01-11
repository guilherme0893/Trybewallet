import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import { connect } from 'react-redux';
// import { addUser } from '../actions';

class UserLogin extends Component {
  render() {
    const { testId, type, id, value, placeholder, onInputChange } = this.props;
    return (
      <div>
        <input
          data-testId={ testId }
          type={ type }
          id={ id }
          value={ value }
          placeholder={ placeholder }
          onChange={ (event) => onInputChange(event) }
        />
      </div>
    );
  }
}

UserLogin.propTypes = {
  testId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default UserLogin;
