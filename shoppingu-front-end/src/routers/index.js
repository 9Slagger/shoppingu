import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SigninPage from "../pages/Signin";
import HomePage from "../pages/Home";
import SignupPage from "../pages/Signup";
import NotFoundPage from "../pages/NotFound";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/signin" component={SigninPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
