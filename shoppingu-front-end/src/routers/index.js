import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history'
import PrivateRoute from "./PrivateRoute";
import SigninPage from "../pages/Signin";
import HomePage from "../pages/Home";
import SignupPage from "../pages/Signup";
import NotFoundPage from "../pages/NotFound";
export const history = createHistory()

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/signin" component={SigninPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
