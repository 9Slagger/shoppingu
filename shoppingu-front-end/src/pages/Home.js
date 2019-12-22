import React, { Component } from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.warn("Home")
    return (
      <Layout>
        <Header {...this.props} />
        <Content>
          <p>
            Reprehenderit est non sint officia est et do mollit. Quis anim ad eu
            eu. Fugiat eu aliqua fugiat et officia nisi aliquip minim aliquip
            eiusmod eu exercitation laboris. Veniam ipsum do ullamco Lorem
            commodo magna anim laboris ut ut Lorem. Tempor esse do cupidatat
            amet consectetur sunt nostrud elit excepteur proident laboris
            officia. Non ullamco qui fugiat aute dolore est et.
          </p>
        </Content>
        <Footer />
      </Layout>
    );
  }
}
