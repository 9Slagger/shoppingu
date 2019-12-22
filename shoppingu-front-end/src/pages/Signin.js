import React, { Component } from "react";
import { Card, Input, Icon, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { Authentication, login } from "../_actions";
// import Auth from "../modules/authentication";
import serviceApi from "../services/api";
import Notification from "../components/Notification";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckEmail: false,
      email: "",
      password: ""
    };
  }
  login = async e => {
    if (this.state.showCheckEmail && this.state.password.length >= 8) {
      try {
        await serviceApi.login({
          email: this.state.email,
          password: this.state.password
        });
        this.props.login()
      } catch (error) {
        Notification("login fail");
      }
    } else {
      Notification("กรุณากรอก email และ password ให้ครบถ้วน");
    }
  };
  loginByKeyEnter = e => {
    if (e.key === "Enter") this.login();
  };
  signup = () => {
    this.props.history.push("/signup");
  };
  validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      this.setState({ showCheckEmail: this.validateEmail(e.target.value) });
    }
  };
  render() {
    const { showCheckEmail, email, password } = this.state;
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
              onChange={this.handleChange}
              onKeyUp={this.loginByKeyEnter}
            />
            <Input
              id="password"
              className="mb-1"
              size="large"
              placeholder="Enter your password"
              type="password"
              prefix={
                <Icon
                  type="security-scan"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              value={password}
              name="password"
              onChange={this.handleChange}
              onKeyUp={this.loginByKeyEnter}
            />
            <Button
              style={{ width: 150 }}
              className="mb-1"
              size="large"
              type="danger"
              onClick={this.login}
            >
              Sign in
            </Button>
            <br />
            <Button size="large" block type="primary" onClick={this.signup}>
              Sign up
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ Authentication }) => Authentication;

const mapDispatchToProps = { Authentication, login };

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
