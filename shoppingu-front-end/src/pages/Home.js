import React, { Component } from "react";
import { Row, Col } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import ProductOverview from "../components/ProductOverview";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          productName: "Europe Street beat",
          netPrice: 1400,
          salePrice: 1800,
          image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        },
        {
          id: 2,
          productName: "Europe Street beat",
          netPrice: 1450,
          salePrice: 1900,
          image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        }
      ]
    };
  }
  render() {
    return (
      <DefaultLayout {...this.props}>
        <Row gutter={[16, 16]}>
          {this.state.products.map(product => (
            <Col xs={12} sm={10} md={8} lg={6} xl={4} xxl={4} key={product.id}>
              <ProductOverview product={product} />
            </Col>
          ))}
        </Row>
      </DefaultLayout>
    );
  }
}
