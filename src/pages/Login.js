import React from 'react';
import PropTypes from 'prop-types';
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

    // this.onInputChange = this.onInputChange.bind(this);
    // this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
  }

  onInputChange = (event) => {
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
    if (regexValidation.test(email) === true
      && password.length >= passwordInputControl) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  displayInput() {
    const { email, password } = this.state;
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
      </div>
    );
  }

  displayButton() {
    const { email, isButtonDisabled } = this.state;
    const { history } = this.props;
    return (
      <ButtonLogin
        email={ email }
        isButtonDisabled={ isButtonDisabled }
        history={ history }
      />
    );
  }

  render() {
    return (
      <div>
        { this.displayInput() }
        { this.displayButton() }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
