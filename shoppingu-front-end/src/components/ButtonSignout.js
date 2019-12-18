import React from "react";
import Auth from "../modules/authentication";
import { useHistory } from "react-router-dom";
import {Button} from 'antd'

export default function Signout() {
  const history = useHistory();
  const signout = () => {
    Auth.signout(() => {
      history.push("/");
    });
  };
  return <Button onClick={signout} type="danger">Sign out</Button>;
}
