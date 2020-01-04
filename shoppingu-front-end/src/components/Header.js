import React from "react";
import { connect } from "react-redux";
import { Menu, Icon, Layout, Button, Row, Col, Input } from "antd";
import { signin, signout } from "../_actions";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckEmail: false,
      email: "",
      password: ""
    };
  }
  signin = async e => {
    if (this.state.showCheckEmail && this.state.password.length >= 8) {
      try {
        this.props.signin();
      } catch (error) {
        Notification("signin fail");
      }
    } else {
      Notification("กรุณากรอก email และ password ให้ครบถ้วน");
    }
  };
  signinByKeyEnter = e => {
    if (e.key === "Enter") this.signin();
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
  signout = () => {
    this.props.signout();
  };

  handleClickNavbar = path => {
    // console.log(path);
    this.props.history.push(path.key);
  };

  renderSigninBox() {
    const { showCheckEmail, email, password } = this.state;
    return (
      <>
        <Input
          id="email"
          style={{width: 200}}
          className="ml-1"
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
          onKeyUp={this.signinByKeyEnter}
        />
        <Input
        style={{width: 200}}
          id="password"
          className="ml-1"
          placeholder="Enter your password"
          type="password"
          prefix={
            <Icon type="security-scan" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          value={password}
          name="password"
          onChange={this.handleChange}
          onKeyUp={this.signinByKeyEnter}
        />
        <Button
          style={{ width: 150 }}
          className="ml-1"
          type="primary"
          onClick={this.signin}
        >
          Sign in
        </Button>
        <label className="ml-1" onClick={this.signup}>
          Sign up
        </label>
      </>
    );
  }

  renderSignoutBox() {
    return (
      <Button onClick={this.signout} type="danger">
        Sign out
      </Button>
    );
  }

  render() {
    const { Authentication } = this.props;
    return (
      <Layout.Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          padding: 0,
          backgroundColor: "white"
        }}
      >
        <Row>
          <Col lg={{ span: 24, offset: 0 }}>
            <Menu
              style={{ lineHeight: "64px" }}
              selectedKeys={[this.props.match.url]}
              mode="horizontal"
              theme="light"
            >
              <Menu.Item key="/" onClick={this.handleClickNavbar}>
                <Icon type="home" />
                Home
              </Menu.Item>
              <Menu.SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <Icon type="setting" />
                    Navigation Three - Submenu
                  </span>
                }
              >
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
              <Menu.Item style={{ float: "right" }}>
                {Authentication.item.isAuthenticated
                  ? this.renderSignoutBox()
                  : this.renderSigninBox()}
              </Menu.Item>
              <Menu.Item
                key="/mycart"
                style={{ float: "right" }}
                onClick={this.handleClickNavbar}
              >
                <Icon type="shopping-cart" />
                My Cart
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

const mapStateToProps = Authentication => ( Authentication );

const mapDispatchToProps = { signin, signout };

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
