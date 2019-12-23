import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../_services/localStorage";

const PrivateRoute = ({
  component: Component,
  location,
  Authentication,
  ...rest
}) => {
  return (
    <Route
      render={props =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
      {...rest}
    />
  );
};

const mapStateToProps = ({ Authentication }) => Authentication;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
