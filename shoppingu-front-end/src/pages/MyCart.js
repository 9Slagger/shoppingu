import React, { Component } from "react";
import {} from "antd";
import DefaultLayout from "../commonComponents/DefaultLayout";

class MyCart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <DefaultLayout {...this.props}>
        <h1>My Cart Page</h1>
      </DefaultLayout>
    );
  }
}

export default MyCart;
