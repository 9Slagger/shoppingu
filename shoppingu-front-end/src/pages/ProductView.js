import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Icon,
  Divider,
  Button,
  Input,
  Spin,
  Carousel
} from "antd";
import DefaultLayout from "../commonComponents/DefaultLayout";
import { serviceProduct } from "../_services";
import { serviceCart } from "../_services";
import Notification from "../commonComponents/Notification";
import { getProductInMyCart } from "../redux/_actions";

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      amount: 1
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    const productId = window.atob(this.props.match.params.productId);
    let product;
    try {
      product = await serviceProduct.getProduct(productId);
      product = product.result;
      this.setState({ product });
    } catch (error) {
      Notification(error.messages);
    }
  }

  getPercent(netPrice, salePrice) {
    let result = (100 - (netPrice / salePrice) * 100).toFixed(0);
    if (result > Number.MIN_SAFE_INTEGER) {
      return result * -1;
    } else {
      return 0;
    }
  }
  handleChange = e => {
    if (e.target.name === "amount" && !(e.target.value >= 1)) {
      this.setState({ [e.target.name]: parseInt(1, 10) });
    } else if (e.target.name === "amount" && e.target.value < 0) {
      return;
    } else if (e.target.name === "amount") {
      this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
    }
  };

  handleChangeAmount = symbol => () => {
    const { amount } = this.state;
    if (amount < 2 && symbol === "-") {
      return;
    }
    if (symbol === "+") {
      this.setState(state => ({ amount: parseInt(state.amount + 1, 10) }));
    } else if (symbol === "-") {
      this.setState(state => ({ amount: parseInt(state.amount - 1, 10) }));
    }
  };

  showValueToDisplay(value) {
    return value || <Spin />;
  }

  addProductToMyCart = (productId, amount) => async () => {
    let data;
    try {
      data = await serviceCart.updateMyCart(productId, amount);
      Notification(data.messages);
      this.props.getProductInMyCart();
    } catch (error) {
      Notification(error.messages);
    }
  };

  render() {
    const { product, amount } = this.state;
    return (
      <DefaultLayout {...this.props}>
        <Card>
          <Row gutter={[36, 0]}>
            <Col xs={8}>
              <Card
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src={
                      product.files && product.files.length
                        ? `http://localhost:8080/${product.files[0].id}${product.files[0].filename_extension}`
                        : "https://www.tellerreport.com/images/no-image.png"
                    }
                  />
                }
                actions={[
                  <>
                    <label>แขร์</label>
                    <Icon type="facebook" />
                  </>,
                  <>
                    <label>รีวิว</label>
                    <Icon type="edit" />
                  </>,
                  <>
                    <br />
                    <Icon type="ellipsis" />
                  </>
                ]}
              >
                {product.files &&
                  product.files.map(file => (
                    <img
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        marginLeft: "0.3rem"
                      }}
                      alt="example"
                      src={`http://localhost:8080/${file.id}${file.filename_extension}`}
                    />
                  ))}
              </Card>
            </Col>
            <Col xs={16} className="pr-3">
              <Row>
                <Col>
                  <h1>{this.showValueToDisplay(product.product_name)}</h1>
                </Col>
                <Col>
                  <span>
                    <label style={{ fontSize: 18 }}>
                      <strong>4.0 </strong>
                    </label>
                    <Icon type="star" style={{ color: "orange" }} />
                    <Icon type="star" style={{ color: "orange" }} />
                    <Icon type="star" style={{ color: "orange" }} />
                    <Icon type="star" style={{ color: "orange" }} />
                    <Icon type="star" style={{ color: "" }} />
                    <Divider type="vertical" />
                    <label style={{ fontSize: 18 }}>
                      <strong>58 </strong>จำนวนรีวิว
                    </label>
                    <Divider type="vertical" />
                    <label style={{ fontSize: 18 }}>
                      <strong>102 </strong>ชิ้นที่ขายแล้ว
                    </label>
                  </span>
                </Col>
                <Col className="mt-1">
                  <span>
                    <label style={{ fontSize: 18 }}>
                      <s>฿{this.showValueToDisplay(product.sale_price)}</s>
                    </label>
                    <label
                      className="ml-1"
                      style={{ fontSize: 22, color: "tomato" }}
                    >
                      ฿{this.showValueToDisplay(product.net_discount_price)}
                    </label>
                    <label
                      style={{
                        backgroundColor: "#D0011C",
                        color: "white",
                        marginLeft: "1rem",
                        paddingRight: "0.2rem",
                        paddingLeft: "0.2rem",
                        borderRadius: "5%"
                      }}
                    >
                      {" "}
                      {this.getPercent(
                        product.net_discount_price || 0,
                        product.sale_price || 0
                      )}{" "}
                      %
                    </label>
                  </span>
                </Col>
                <Col className="mt-2">
                  <span>
                    <label style={{}}>จำนวน</label>
                    <span style={{ marginLeft: "2rem" }}>
                      <Button onClick={this.handleChangeAmount("-")}>
                        <Icon type="minus" />
                      </Button>
                      <Input
                        placeholder="จำนวนสินค้า"
                        value={amount}
                        name="amount"
                        type="number"
                        style={{ width: "60px" }}
                        onChange={this.handleChange}
                      />
                      <Button onClick={this.handleChangeAmount("+")}>
                        <Icon type="plus" />
                      </Button>
                    </span>
                    <label style={{ marginLeft: "2rem" }}>
                      มีสินค้าทั้งหมด {this.showValueToDisplay(product.amount)}{" "}
                      ชิ้น
                    </label>
                  </span>
                </Col>
                <Col className="mt-2">
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginLeft: "3rem" }}
                    onClick={this.addProductToMyCart(product.id, amount)}
                  >
                    <Icon type="shopping-cart" />
                    เพิ่มไปยังรถเข็นของฉัน
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Card style={{ width: "100%" }}>
                {/* <code> */}
                <p>{product.product_detail}</p>
                {/* </code> */}
              </Card>
            </Col>
          </Row>
        </Card>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = {
  getProductInMyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);

                // cover={
                //   <Carousel>
                //     {product.files &&
                //       product.files.map(file => (
                //         <div key={file.id}>
                //           <img
                //             style={{width: 300}}
                //             alt="example"
                //             src={
                //               product.files && product.files.length
                //                 ? `http://localhost:8080/${file.id}${file.filename_extension}`
                //                 : "https://www.tellerreport.com/images/no-image.png"
                //             }
                //           />
                //         </div>
                //       ))}
                //   </Carousel>
                // }