import React from "react";
import { connect } from "react-redux";
import Notification from "../commonComponents/Notification";
import { Menu, Icon, Layout, Button, Row, Col, Input, Badge } from "antd";
import {
  signin,
  signout,
  clearMessages,
  getProductInMyCart
} from "../redux/_actions";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckEmail: false,
      email: "",
      password: "",
      search: ""
    };
  }
  componentDidMount() {
    this.props.getProductInMyCart();
    if (
      this.props.Authentication.messages &&
      this.props.Authentication.messages.length
    ) {
      Notification(this.props.Authentication.messages);
      this.props.clearMessages();
    }
  }
  signin = async e => {
    if (!(this.state.showCheckEmail && this.state.password.length >= 8)) {
      Notification(["กรุณากรอก email และ password ให้ครบถ้วน"]);
      this.props.clearMessages();
    }
    let { email, password } = this.state;
    this.props.signin(email, password);
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
    this.props.history.push(path.key);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.Authentication.messages &&
      nextProps.Authentication.messages.length
    ) {
      Notification(nextProps.Authentication.messages);
      this.props.clearMessages();
    }
  }

  renderSigninBox() {
    const { showCheckEmail, email, password } = this.state;
    return (
      <>
        <Input
          id="email"
          style={{ width: 200 }}
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
          style={{ width: 200 }}
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
        <label
          style={{ cursor: "pointer" }}
          className="ml-1"
          onClick={this.signup}
        >
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

  renderCustomer() {
    return (
      <Menu.SubMenu
        style={{ float: "right" }}
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            Manage Store
          </span>
        }
      >
        <Menu.ItemGroup title="ร้านค้า">
          <Menu.Item key="/store/add" onClick={this.handleClickNavbar}>
            เปิดร้านค้าใหม่
          </Menu.Item>
          <Menu.Item key="/mystore/list" onClick={this.handleClickNavbar}>
            จัดการร้านค้า
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    );
  }

  renderCustomerService() {
    return (
      <Menu.SubMenu
        style={{ float: "right" }}
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            Manage Request
          </span>
        }
      >
        <Menu.ItemGroup title="จัดการคำร้อง">
          <Menu.Item key="/store/approve" onClick={this.handleClickNavbar}>
            คำร้องเปิดร้านค้า
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    );
  }

  getNavColor() {
    if (
      this.props.Authentication.item.role &&
      this.props.Authentication.item.role === "03CS"
    ) {
      return "dark";
    }
    return "light";
  }

  handlePressEnterSearch = e => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    alert("coming soon");
  };

  render() {
    const { search } = this.state;
    const { Authentication, Cart } = this.props;
    const navColor = this.getNavColor();
    const countNoti =
      Cart.item.products &&
      Cart.item.products.length &&
      Cart.item.products.reduce((sum, product) => {
        return sum + product.product_in_cart.amount;
      }, 0);
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
              theme={navColor}
              selectedKeys={[this.props.match.url]}
              mode="horizontal"
            >
              <Menu.Item key="/" onClick={this.handleClickNavbar}>
                <Icon type="home" />
                Home
              </Menu.Item>
              <Menu.Item
                style={{
                  marginLeft: !Authentication.item.isAuthenticated
                    ? "0%"
                    : "25%"
                }}
              >
                <Input
                  type="text"
                  placeholder="ค้นหาสินค้า"
                  style={{ width: "550px" }}
                  name="search"
                  value={search}
                  onKeyPress={this.handlePressEnterSearch}
                />
                <Icon type="search" onClick={this.handleSearch} />
              </Menu.Item>
              <Menu.Item style={{ float: "right" }}>
                {Authentication.item.isAuthenticated
                  ? this.renderSignoutBox()
                  : this.renderSigninBox()}
              </Menu.Item>
              {Authentication.item.role === "03CS" &&
                this.renderCustomerService()}
              {Authentication.item.role === "02CM" && this.renderCustomer()}
              {Authentication.item.role === "02CM" && (
                <Menu.Item
                  key="/mycart"
                  style={{ float: "right" }}
                  onClick={this.handleClickNavbar}
                >
                  My Cart
                  <Badge count={countNoti}>
                    <Icon type="shopping-cart" />
                  </Badge>
                </Menu.Item>
              )}
            </Menu>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

const mapStateToProps = ({ Authentication, Cart }) => ({
  Authentication,
  Cart
});

const mapDispatchToProps = {
  signin,
  signout,
  clearMessages,
  getProductInMyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
