import React, { Component } from 'react';

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onInputChangeEmail = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      email,
      password,
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
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default UserLogin;
