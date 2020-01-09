import React, { Component } from "react";
import { Row, Col } from "antd";
import DefaultLayout from "../commonComponents/DefaultLayout";
import ProductOverview from "../commonComponents/ProductOverview";
import { serviceProduct } from "../_services";
import Notification from "../commonComponents/Notification";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsList: []
    };
  }

  componentDidMount() {
    this.getPublishProduct();
  }

  async getPublishProduct() {
    let productsList;
    try {
      productsList = await serviceProduct.getPublishProduct();
      productsList = productsList.result;
      this.setState({ productsList });
    } catch (error) {
      Notification(error.messages);
    }
  }

  render() {
    const { productsList } = this.state;
    return (
      <DefaultLayout {...this.props}>
        <Row gutter={[16, 16]}>
          {productsList.map(product => (
            <Col xs={12} sm={10} md={8} lg={6} xl={4} xxl={4} key={product.id}>
              <ProductOverview {...this.props} product={product} />
            </Col>
          ))}
        </Row>
      </DefaultLayout>
    );
  }
}
