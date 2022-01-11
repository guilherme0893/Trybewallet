import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class ButtonLogin extends Component {
  render() {
    const { isButtonDisabled, history, email, addUser } = this.props;

    return (
      <button
        type="button"
        disabled={ isButtonDisabled }
        onClick={ () => {
          addUser(email);
          history.push('/carteira');
        } }
      >
        Entrar
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(addUser(email)),
});
const mapStateToProps = (state) => (state);

ButtonLogin.propTypes = {
  addUser: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogin);
