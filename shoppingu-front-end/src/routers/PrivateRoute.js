import React from "react";
import { Route, useHistory } from "react-router-dom";
import Auth from "../modules/authentication";

export default ({ component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      component={(Auth.isAuthenticated ? component : history.push("/signin"))}
    />
  );
}
