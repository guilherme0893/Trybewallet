import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addUserAct } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isUserLogged: false,
      isButtonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.validateEmailAndPassword());
  }

  onLoginButtonClick() {
    const { email } = this.state;
    const { addUser } = this.props;
    addUser(email);
    this.setState({ isUserLogged: true });
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const emailValidation = email.match(validation);
    const passwordInputControl = 6;

    if (!emailValidation || password.length < passwordInputControl) {
      this.setState({
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isButtonDisabled: false,
      });
    }
  }

  render() {
    const { email, password, isUserLogged, isButtonDisabled } = this.state;

    if (isUserLogged) return <Redirect to="/carteira" />;

    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="text"
            name="email"
            id="email"
            value={ email }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.onLoginButtonClick }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(addUserAct(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};
