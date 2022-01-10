import React, { Component } from 'react';

class UserLogin extends Component {
  render() {
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            name="email"
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
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
