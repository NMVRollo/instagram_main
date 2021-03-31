import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import * as Pages from 'pages';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Pages.SignUp}/>


      </Switch>
    </Router>
  );
};