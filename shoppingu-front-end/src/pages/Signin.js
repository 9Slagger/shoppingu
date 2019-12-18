import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Input, Icon, Button, Row, Col } from "antd";
import Swal from "sweetalert2";
import Auth from "../modules/authentication";
import serviceApi from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  const history = useHistory();

  const loginByKeyEnter = e => {
    if (e.key === "Enter") login();
  };
  const login = async e => {
    if (showCheckEmail && password.length >= 8) {
      try {
        let result = await serviceApi.login({ email, password });
        Auth.signin(result.data, () => {
          history.goBack()
        });
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: `${error.response.data.msg}`,
          timer: 2000
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: `กรุณากรอก email และ password ให้ครบถ้วน`,
        timer: 5000
      });
    }
  };

  const signup = () => {
    history.push("/signup");
  };

  const validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = e => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      if (validateEmail(e.target.value)) setShowCheckEmail(true);
      else setShowCheckEmail(false);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <Row className="container">
      <Col className="box" xs={22} sm={18} md={14} lg={10} xl={8}>
        <Card>
          <Input
            className="mb-1"
            size="large"
            placeholder="Enter your email"
            type="text"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            suffix={
              showCheckEmail && (
                <Icon type="check" style={{ color: "rgba(0,0,0,.45)" }} />
              )
            }
            value={email}
            name="email"
            onChange={handleChange}
            onKeyUp={loginByKeyEnter}
          />
          <Input
            id="password"
            className="mb-1"
            size="large"
            placeholder="Enter your password"
            type="password"
            prefix={
              <Icon type="security-scan" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            value={password}
            name="password"
            onChange={handleChange}
            onKeyUp={loginByKeyEnter}
          />
          <Button
            style={{ width: 150 }}
            className="mb-1"
            size="large"
            type="danger"
            onClick={login}
          >
            Sign in
          </Button>
          <br />
          <Button size="large" block type="primary" onClick={signup}>
            Sign up
          </Button>
        </Card>
      </Col>
    </Row>
  );
};
export default LoginPage;
