import React from "react";
import Auth from "../modules/authentication";
import { Button } from "antd";

export default function Signout(props) {
  const signout = () => {
    Auth.signout(() => {
      props.history.push("/");
    });
  };
  return (
    <Button onClick={signout} type="danger">
      Sign out
    </Button>
  );
}
