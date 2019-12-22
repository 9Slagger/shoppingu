import React from "react";
import { connect } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const PrivateRoute = ({ component, Authentication, ...rest }) => {
  const history = useHistory();
  console.log("Authentication", Authentication);
  return (
    <Route
      {...rest}
      component={
        !!localStorage.getItem('token')
          ? component
          : history.push("/signin")
      }
    />
  );
};

const mapStateToProps = ({ Authentication }) => Authentication;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);