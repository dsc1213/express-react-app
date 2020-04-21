import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/store';

import Home from './pages/Inventory/home';

const RouteNotFound = () => <div style={{ color: 'red' }}>ROUTE NOT FOUND</div>;

const App = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/home" name="home" exact={true} render={Home} />
      <Redirect from="/" to="/home" />
      <Redirect from="*" to="/home" />
      <Route render={RouteNotFound} />
    </Switch>
  </ConnectedRouter>
);

export default App;
