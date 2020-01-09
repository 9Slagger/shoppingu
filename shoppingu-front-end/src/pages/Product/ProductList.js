import React, { Component } from "react";
import { serviceProduct, serviceProductType } from "../../_services";
import DefaultLayout from "../../commonComponents/DefaultLayout";
import UploadFile from "../../commonComponents/UploadFile";
import Notification from "../../commonComponents/Notification";
import {
  Row,
  Col,
  Table,
  Switch,
  Icon,
  Tag,
  Form,
  Input,
  Button,
  Divider,
  Select
} from "antd";
import moment from "moment";

export default class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableInput: false,
      productId: "",
      showAddProduct: false,
      productName: "",
      productTypeCode: "",
      isSale: true,
      productDetail: "",
      salePrice: "",
      netDiscountPrice: "",
      amount: 0,
      productTypeList: [],
      columns: [
        {
          title: "ชื่อสินค้า",
          dataIndex: "product_name",
          key: "product_name"
        },
        {
          title: "ประเภทสินค้า",
          key: "product_type.type_name",
          dataIndex: "product_type.type_name",
          render: (text, data) => (
            <Tag color="geekblue" key={data.id}>
              {data["product_type.type_name"]}
            </Tag>
          )
        },
        {
          title: "เปิดขาย",
          key: "is_sale",
          dataIndex: "is_sale",
          render: (text, data) => (
            <Switch
              onClick={this.modifyProduct(data.id)}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              checked={!!data["is_sale"]}
            />
          )
        },
        {
          title: "จำนวนคงเหลือ",
          key: "amount",
          dataIndex: "amount"
        },
        {
          title: "ราคาเต็ม",
          key: "sale_price",
          dataIndex: "sale_price"
        },
        {
          title: "ราคาขาย",
          key: "net_discount_price",
          dataIndex: "net_discount_price"
        },
        {
          title: "เวลาเพิ่ม",
          key: "createdAt",
          dataIndex: "createdAt"
        },
        {
          title: "เวลาแก้ไขล่าสุด",
          key: "updatedAt",
          dataIndex: "updatedAt"
        }
      ],
      productList: []
    };
  }
  componentDidMount() {
    this.getProductFromStore();
    this.serviceProductType();
  }

  async getProductFromStore() {
    const storeId = window.atob(this.props.match.params.storeId);
    let productList;
    try {
      productList = await serviceProduct.getProductFromStore(storeId);
      productList = productList.result;
      //preparedata
      productList = productList.map(product => ({
        ...product,
        key: product.id,
        createdAt: moment(product.createdAt).format("DD/MM/YYYY h:mm"),
        updatedAt: moment(product.updatedAt).format("DD/MM/YYYY h:mm")
      }));
      //
      this.setState({ productList });
    } catch (error) {
      Notification(error.messages);
    }
  }

  async serviceProductType() {
    let productTypeList, productTypeCode;
    try {
      productTypeList = await serviceProductType.getProductType();
      productTypeList = productTypeList.result;
      // preparedata
      if (productTypeList.length) {
        productTypeCode = productTypeList[0].type_code;
      } else {
        productTypeCode = "";
      }
      //
      this.setState({ productTypeList, productTypeCode });
      Notification(productTypeList.messages);
    } catch (error) {
      Notification(error.messages);
    }
  }

  handlePublishProduct = productId => () => {
    alert(productId);
  };

  hangleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  hangleSelectOrCheck = e => {
    if (typeof e === "boolean") {
      this.setState({ isSale: e });
    } else if (typeof e === "string") {
      this.setState({ productTypeCode: e });
    }
  };

  getPercent(netPrice, salePrice) {
    let result = (100 - (netPrice / salePrice) * 100).toFixed(0);
    if (result > Number.MIN_SAFE_INTEGER) {
      return result;
    } else {
      return 0;
    }
  }

  handleSubmit = async e => {
    const storeId = window.atob(this.props.match.params.storeId);
    const {
      productTypeCode,
      productName,
      isSale,
      productDetail,
      salePrice,
      netDiscountPrice,
      amount
    } = this.state;
    let productResult;
    try {
      productResult = await serviceProduct.addProductToStore(
        storeId,
        productTypeCode,
        productName,
        isSale,
        productDetail,
        salePrice,
        netDiscountPrice,
        amount
      );
      this.setState({ productId: productResult.result.id, disableInput: true });
      this.getProductFromStore();
      Notification(productResult.messages);
    } catch (error) {
      Notification(error.messages);
    }
  };

  clearProductId = () => {
    this.setState({ productId: "", disableInput: true });
    Notification(["upload image success"]);
  };

  modifyProduct = productId => async e => {
    const storeId = window.atob(this.props.match.params.storeId);
    const isSale = e;
    const {
      // productTypeCode,
      productName,
      productDetail,
      salePrice,
      netDiscountPrice
    } = this.state;
    let productResult;
    try {
      productResult = await serviceProduct.modifyProduct(
        productId,
        storeId,
        // productTypeCode,
        null,
        productName,
        productDetail,
        salePrice,
        netDiscountPrice,
        isSale
      );
      this.getProductFromStore();
      Notification(productResult.messages);
    } catch (error) {
      Notification(error.messages);
    }
  };

  render() {
    const {
      disableInput,
      productId,
      columns,
      productList,
      productTypeList,
      productName,
      productTypeCode,
      isSale,
      productDetail,
      salePrice,
      netDiscountPrice,
      amount,
      showAddProduct
    } = this.state;
    const lineProductDetail = productDetail.split("\n");
    const rowsproductDetail =
      lineProductDetail.length > 15 ? lineProductDetail.length : 15;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          {showAddProduct && (
            <Col>
              <Form>
                <Row gutter={[16, 0]}>
                  <Col sm={15}>
                    <Form.Item label="ชื่อสินค้า">
                      <Input
                        placeholder="[รับประกัน 1 ปี] Eloop E12 แบตสำรอง 11000mAh Power Bank ของแท้ 100% ฟรีซองกำมะหยี่+สายชาร์จ"
                        name="productName"
                        value={productName}
                        onChange={this.hangleChangeInput}
                        disabled={disableInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={7}>
                    <Form.Item label="ประเภทสินค้า">
                      <Select
                        name="productTypeCode"
                        value={productTypeCode}
                        onChange={this.hangleSelectOrCheck}
                        disabled={disableInput}
                      >
                        {Array.isArray(productTypeList) &&
                          productTypeList.map(product => (
                            <Select.Option
                              key={product.id}
                              value={product.type_code}
                            >
                              {product.type_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={2}>
                    <Form.Item label="เปิดขายทันที">
                      <Switch
                        name="isSale"
                        checked={isSale}
                        onChange={this.hangleSelectOrCheck}
                        disabled={disableInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item label="รายละเอียดสินค้า">
                      <Input.TextArea
                        placeholder={`🔥[[ โค้ดส่วนลดประจำ เดือนธันวาคม]]🔥\n⚡โค้ด "GGDEC19" เมื่อสั่งซื้อขั้นต่ำ 500.- รับเงินคืน 15% สูงสุด 150 Coins  15-31 ธ.ค. 62\nรายละเอียดสินค้า\nชาร์จพลังให้กับอุปกรณ์พกพาต่างๆ ให้พร้อมใช้งานแม้อยู่นอกบ้านได้สะดวก ไม่ว่าจะเป็นสมาร์ทโฟน, แท็บเล็ต, เครื่องเล่นเพลงพกพา ด้วยแบตเตอรี่สำรอง Eloop รุ่น E12 ความจุ 11000 mAhกระแสไฟสูงสุด 2.1A เหมาะอย่างยิ่ง สำหรับพกพาติดตัวไปในสถานที่ต่างๆ ด้วยขนาดที่กะทัดรัด พร้อมมีไฟบอกระดับแบตเตอรี่ในตัว\nพอร์ตการใช้งานต่างๆ \nพอร์ต USB\n  -แบตเตอรี่สำรองมาพร้อมช่องพอร์ต USB 2 ช่อง เพื่อรีชาร์จแบตเตอรี่ให้กับตัวอุปกรณ์พกพาต่างๆ ได้พร้อมกัน 2 เครื่อง ไม่ว่าจะเป็นiPhone, iPod, MP3, MP4, สมาร์ทโฟน และแท็บเล็ตรุ่นต่างๆ ที่รองรับ นอกจากนี้ยังรีชาร์จแบตเตอรี่ให้ Android Phone และ Android Tablet รุ่นที่รองรับสาย Micro USB  โดยพอร์ต USB สามารถจ่ายกระแสไฟได้สูงสุด 2.1A เหมาะสำหรับรีชาร์จแบตเตอรี่ให้อุปกรณ์เชื่อมต่อทุกชนิดที่รองรับการรีชาร์จไฟที่ต่ำกว่าหรือเท่ากับ 2.1A ได้อย่างรวดเร็ว\nรีชาร์จผ่านพอร์ต Micro USB\n  -สะดวกในการเติมพลังแบตเตอรี่สำรองผ่านพอร์ต Micro USB ให้คุณสะดวกในการรีชาร์จแบตเตอรี่สำรอง ด้วยการเสียบจากอะแด็ปเตอร์หรือจะรีชาร์จผ่านโน้ตบุ๊กก็ได้`}
                        rows={rowsproductDetail}
                        name="productDetail"
                        value={productDetail}
                        onChange={this.hangleChangeInput}
                        disabled={disableInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={2}>
                    <Form.Item label="จำนวนสินค้า">
                      <Input
                        name="amount"
                        type="number"
                        onChange={this.hangleChangeInput}
                        value={amount}
                        placeholder="245"
                        disabled={disableInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={3}>
                    <Form.Item label="ราคาเต็ม">
                      <Input
                        name="salePrice"
                        type="number"
                        onChange={this.hangleChangeInput}
                        value={salePrice}
                        placeholder="7000"
                        disabled={disableInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={3}>
                    <Form.Item label="ราคาขาย">
                      <Input
                        name="netDiscountPrice"
                        type="number"
                        onChange={this.hangleChangeInput}
                        value={netDiscountPrice}
                        placeholder="5500"
                        disabled={disableInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={4}>
                    <Form.Item
                      label=""
                      style={{ display: "table", margin: "0 auto" }}
                    >
                      <br />
                      <label style={{ color: "777777", fontSize: "12px" }}>
                        ส่วนลด {this.getPercent(netDiscountPrice, salePrice)}%
                      </label>
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item style={{ display: "table", margin: "0 auto" }}>
                      {productId && (
                        <UploadFile
                          productId={productId}
                          clearProductId={this.clearProductId}
                        />
                      )}
                    </Form.Item>
                    <Form.Item style={{ display: "table", margin: "0 auto" }}>
                      <br />
                      {!disableInput ? (
                        <>
                          <Button
                            type="primary"
                            onClick={this.handleSubmit}
                            disabled={disableInput}
                          >
                            Submit
                          </Button>
                          <Divider type="vertical" />
                          <Button
                            type="light"
                            onClick={() => {
                              this.setState({ showAddProduct: false });
                            }}
                            disabled={disableInput}
                          >
                            Close
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() => {
                            this.setState({
                              disableInput: false,
                              productId: ""
                            });
                          }}
                        >
                          เพิ่มสินค้าชิ้นใหม่
                        </Button>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          )}
          <Col>{showAddProduct && <hr className="mb-2" />}</Col>
          <Col>
            <div style={{ display: "table", margin: "0 auto" }}>
              <h3>
                รายชื่อสินค้าภายในร้าน
                {!showAddProduct && (
                  <>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        this.setState({ showAddProduct: true });
                      }}
                    >
                      <Icon type="plus" />
                    </Button>
                  </>
                )}
              </h3>
            </div>
          </Col>
          <Col>
            <Table columns={columns} dataSource={productList} />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
