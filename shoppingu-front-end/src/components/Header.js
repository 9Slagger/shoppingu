import React from "react";
import { Menu, Icon, Layout } from "antd";
import ButtonSignout from "../components/ButtonSignout";

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  state = {
    current: "mail"
  };

  handleClick = e => {
    // console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Layout.Header
        style={{ position: "fixed", zIndex: 1, width: "100%", padding: 0 }}
      >
        <Menu
          style={{ lineHeight: "64px" }}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            Navigation Two
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
          <Menu.Item key="alipay">
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Navigation Four - Link
            </a>
          </Menu.Item>
          <Menu.Item>
            <ButtonSignout {...this.props} />
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
