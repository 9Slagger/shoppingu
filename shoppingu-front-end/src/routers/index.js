import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import PrivateRoute from "../components/PrivateRoute";
import HomePage from "../pages/Home";
import SignupPage from "../pages/Signup";
import MyCartPage from "../pages/MyCart";
import NotFoundPage from "../pages/NotFound";
import AddStorePage from "../pages/Store/AddStore"
import ApproveStorePage from "../pages/Store/ApproveStore"
export const history = createHistory();

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <PrivateRoute exact path="/mycart" component={MyCartPage} />
        <PrivateRoute exact path="/store/add" component={AddStorePage} />
        <PrivateRoute exact path="/store/approve" component={ApproveStorePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
