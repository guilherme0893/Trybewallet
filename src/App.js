import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div
        className="pt-20 p-2 h-screen"
        style={ {
          backgroundColor: '#9921e8',
          backgroundImage: 'linear-gradient(315deg, #cc99cc, #999999 75%',
        } }
      >
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" render={ () => <Wallet /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
