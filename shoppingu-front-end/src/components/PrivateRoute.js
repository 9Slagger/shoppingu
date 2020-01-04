import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../_services/localStorage";

const PrivateRoute = ({ component: Component, location, ...rest }) => (
  <Route
    render={props =>
      getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )
    }
    {...rest}
  />
);

const mapStateToProps = ({ Authentication }) => Authentication;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
