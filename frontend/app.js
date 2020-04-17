import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Inventory/login';

const Home = () => <div>HELLO ROUTE RECIEVE</div>;
const Test = () => <div>TEST ROUTE</div>;
const RouteNotFound = () => <div style={{ color: 'red' }}>ROUTE NOT FOUND</div>;

const App = () => (
  <Router>
    <Switch>
      <Route
        path='/7Boss/Inventory/login'
        name='login'
        exact={true}
        render={Login}
      />
      <Route
        path='/7Boss/Inventory/home'
        name='home'
        exact={true}
        render={Home}
      />
      <Route
        path='/7Boss/Inventory/test'
        name='name'
        exact={true}
        render={Test}
      />
      <Route render={RouteNotFound} />
    </Switch>
  </Router>
);
export default App;
