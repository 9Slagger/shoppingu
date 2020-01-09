import React, { Component } from "react";
import { Card, Row, Col, Button, Icon, Input } from "antd";
import { connect } from "react-redux";
import { getProductInMyCart } from "../redux/_actions";
import DefaultLayout from "../commonComponents/DefaultLayout";

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPercent(netPrice, salePrice) {
    let result = (100 - (netPrice / salePrice) * 100).toFixed(0);
    if (result > Number.MIN_SAFE_INTEGER) {
      return result;
    } else {
      return 0;
    }
  }

  handleChangeAmount = () => () => {
    alert("coming soon");
  };

  handleChange = e => {
    alert("coming soon");
  };

  render() {
    const { Cart } = this.props;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          {Cart.item.products &&
            Cart.item.products.map(product => (
              <Col key={product.id}>
                <Card hoverable style={{ width: "100%", marginTop: "1.5rem" }}>
                  <Row>
                    <Col xs={6}>
                      <img
                        style={{ width: "100%" }}
                        alt="example"
                        src={
                          product.files && product.files.length
                            ? `http://localhost:8080/${product.files[0].id}${product.files[0].filename_extension}`
                            : "https://www.tellerreport.com/images/no-image.png"
                        }
                      />
                    </Col>
                    <Col xs={18} style={{ paddingLeft: "3rem" }}>
                      <span>
                        <h1> {product.product_name}</h1>
                      </span>
                      <label style={{ color: "tomato", fontSize: "20px" }}>
                        <strong>฿{product.net_discount_price}</strong>
                      </label>
                      <label
                        style={{
                          color: "777777",
                          fontSize: "18px",
                          paddingLeft: "1rem"
                        }}
                      >
                        <s>฿{product.sale_price}</s>{" "}
                        {this.getPercent(
                          product.net_discount_price,
                          product.sale_price
                        )}
                        %
                      </label>
                      <br />
                      <label style={{}}>จำนวน</label>
                      <span style={{ marginLeft: "2rem" }}>
                        <Button onClick={this.handleChangeAmount("-")}>
                          <Icon type="minus" />
                        </Button>
                        <Input
                          placeholder="จำนวนสินค้า"
                          value={product.product_in_cart.amount}
                          name="amount"
                          type="number"
                          style={{ width: "60px" }}
                          onChange={this.handleChange}
                        />
                        <Button onClick={this.handleChangeAmount("+")}>
                          <Icon type="plus" />
                        </Button>
                      </span>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
        <Row className="mt-2">
          <Col>
            <div style={{ display: "table", margin: "0 auto" }}>
              <Button.Group>
                <Button type="primary" size="large" onClick={() => {alert("coming soon")}}>ชำระเงิน</Button>
              </Button.Group>
            </div>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = ({ Cart }) => ({
  Cart
});

const mapDispatchToProps = {
  getProductInMyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
