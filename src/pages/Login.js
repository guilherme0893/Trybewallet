/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { FaUser } from 'react-icons/fa';
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
      <main
        className="shadow-2xl h-screen flex-col flex items-center justify-center"
        style={ {
          backgroundColor: '#9921e8',
          backgroundImage: 'linear-gradient(315deg, #cc99cc, #999999 75%',
        } }
      >
        <div className="border-4 border-purple-200 pt-10 p-10 w-1/8">
          <section className="flex items-center justify-center">
            <h3 className="font-bold text-2xl mb-5">Welcome to TrybeWallet</h3>
          </section>
          <section className="flex items-center justify-center">
            <form className="flex flex-col items-center mb-6 pt-3 rounded bg-gray-200">
              {/* <div className="mb-6 pt-3 rounded bg-gray-200"> */}
              <label
                htmlFor="email"
                className="block font-bold text-sm mb-2 ml-3 text-gray-700"
              >
                <FaUser />
                {/* <div className="flex flex-row pb-1">
                </div> */}
                <input
                  className="ml-3 mr-3 py-2 px-3 bg-gray-200 border shadow-sm
                      focus:outline-none text-gray-700 block rounded-md font-mono
                        border-b-4 border-gray-200 focus:border-purple-600
                          transition duration-500"
                  data-testid="email-input"
                  placeholder="user email"
                  type="text"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ this.onInputChange }
                />
              </label>
              {/* </div> */}
              {/* <div className="mb-6 pt-3 rounded bg-gray-200"> */}
              <label
                htmlFor="password"
                className="block font-bold text-sm mb-2 ml-3 text-gray-700"
              >
                <div className="flex flex-row pb-1">
                  Password
                </div>
                <input
                  className="ml-3 mr-3 py-2 px-3 bg-gray-200 border shadow-sm
                    focus:outline-none text-gray-700 block rounded-md font-mono
                      border-b-4 border-gray-200 focus:border-purple-600
                        transition duration-500"
                  data-testid="password-input"
                  type="password"
                  name="password"
                  id="password"
                  value={ password }
                  onChange={ this.onInputChange }
                />
              </label>
            </form>
          </section>
          <div className="flex justify-center">
            <button
              className="mt-4 bg-white hover:bg-purple-700 hover:text-white
                text-dark font-bold py-2 px-4 border border-purple-300
                  rounded transtion duration-500"
              type="submit"
              onClick={ this.onLoginButtonClick }
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </div>
        </div>

      </main>
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
