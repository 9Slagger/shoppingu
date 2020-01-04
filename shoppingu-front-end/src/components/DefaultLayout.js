import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default props => {
  return (
    <Layout>
      <Header {...props} />
      <Content style={{paddingTop: "1rem"}}>{props.children}</Content>
      <Footer />
    </Layout>
  );
};
