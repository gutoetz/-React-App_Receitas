import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Provider from './context/MyProvider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" />
        <Route exact path="/drinks" />
        <Route exact path="/meals/:id" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/meals/:id/in-progress" />
        <Route exact path="/drinks/:id/in-progress" />
        <Route exact path="/profile" />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" />
      </Switch>
    </Provider>
  );
}

export default App;
