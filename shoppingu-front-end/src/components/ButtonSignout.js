import React from "react";
import Auth from "../modules/authentication";
import { Button } from "antd";

export default class ButtonSignout extends React.Component {
  signout = () => {
    Auth.signout(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <Button onClick={this.signout} type="danger">
        Sign out
      </Button>
    );
  }
}
