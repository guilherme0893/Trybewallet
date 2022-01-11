import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
// import UserLogin from '../components/UserLogin';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" render={ () => <Wallet /> } />
      </Switch>
    );
  }
}

export default Routes;
