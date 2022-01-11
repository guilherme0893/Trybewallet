import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonLogin from '../components/ButtonLogin';
import UserLogin from '../components/UserLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };

    this.onInputChangeEmail = this.onInputChange.bind(this);
    this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
  }

  onInputChange(event) {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    }, () => this.validateEmailAndPassword());
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    // regex compartilhado pelo colega Josué
    const regexValidation = /\S+@\S+.\S+/;
    const passwordInputControl = 6;
    if (regexValidation.test(email)
      && passwordInputControl <= password.length) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  render() {
    const { isButtonDisabled, email, password } = this.state;
    const { history } = this.props;
    return (
      <div>
        <UserLogin
          testId="email-input"
          placeholder="Digite aqui seu email"
          type="email"
          id="email"
          value={ email }
          onInputChange={ this.onInputChange }
        />
        <UserLogin
          testId="password-input"
          placeholder="Digite sua senha aqui"
          type="password"
          id="password"
          value={ password }
          onInputChange={ this.onInputChange }
        />
        <ButtonLogin
          email={ email }
          disabled={ isButtonDisabled }
          history={ history }
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
