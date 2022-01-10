import React, { Component } from 'react';

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      login: false,
    };
  }

  onInputChangeEmail = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateEmailAndPassword = () => {
    const { email, password } = this.state;
    const passwordInputControl = 6;
    if (email.includes('@')
    && email.includes('.com') && password.length >= passwordInputControl) {
      return true;
    }
    return false;
  }

  onButtonClick = (event) => {
    event.preventDefault();
    // const { login } = this.state;
    this.setState({
      login: true,
    });
  }

  render() {
    const {
      email,
      password,
      // login,
    } = this.state;

    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.onInputChangeEmail }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
          />
        </form>
        <button
          type="submit"
          disabled={ this.validateEmailAndPassword }
          onClick={ this.onButtonClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default UserLogin;
