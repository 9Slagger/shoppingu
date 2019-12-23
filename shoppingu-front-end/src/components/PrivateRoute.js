import React from "react";
import { connect } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { getToken } from "../services/localStorage";

const PrivateRoute = ({ component: Component, Authentication, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      // render={props =>
      //   !!getToken() ? (
      //     <Component {...props} />
      //   ) : (
      //     history.push("/signin")
      //   )
      // }
      component={!!getToken() ? Component : history.push("/signin")}
    />
  );
};

const mapStateToProps = ({ Authentication }) => Authentication;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
