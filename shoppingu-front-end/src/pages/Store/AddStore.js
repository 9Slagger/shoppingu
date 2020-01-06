import React, { Component } from "react";
import serviceStore from "../../_services/store";
import DefaultLayout from "../../components/DefaultLayout";
import { Row, Col, Form, Input, Button, Select, notification } from "antd";

export default class AddStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      storeDetail: "",
      storeTypeCode: "01LE",
      StoreTypeList: []
    };
  }

  componentDidMount() {
    this.getStoreType();
  }

  async getStoreType() {
    let StoreTypeList;
    try {
      StoreTypeList = await serviceStore.getStoreType();
      StoreTypeList = StoreTypeList.result;
    } catch (error) {
      this.showNotification(error.messages);
    }
    this.setState({ StoreTypeList });
  }

  showNotification(messages, description = "", duration = 2) {
    if (messages.length) {
      notification.info({
        message: messages,
        description,
        duration,
        placement: "topRight"
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = e => {
    this.setState({ storeTypeId: e });
  };

  submitForm = async () => {
    const { storeName, storeDetail, storeTypeCode } = this.state;
    try {
      await serviceStore.createStore(storeName, storeDetail, storeTypeCode);
      this.showNotification("สร้างคำร้องขอเปิดร้านค้าสำเร็จ");
      this.props.history.push("/")
    } catch (error) {
      this.showNotification(error.messages)
    }
  };

  render() {
    const { storeName, storeDetail, storeTypeCode, StoreTypeList } = this.state;
    const lengthStoreDetail = storeDetail.split("\n");
    const rowsStoreDetail =
      lengthStoreDetail.length > 10 ? lengthStoreDetail.length : 10;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          <h3>Signup</h3>
          <Form>
            <Row gutter={[16, 0]}>
              <Col lg={12}>
                <Form.Item label="ชื่อร้านค้า">
                  <Input
                    type="text"
                    value={storeName}
                    name="storeName"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="ประเภทร้านค้า" hasFeedback>
                  <Select
                    defaultValue={storeTypeCode}
                    style={{ width: 300 }}
                    onChange={this.handleSelect}
                  >
                    {Array.isArray(StoreTypeList) &&
                      StoreTypeList.map(data => (
                        <Select.Option
                          key={data.store_type_code}
                          value={data.store_type_code}
                        >
                          {data.store_type_name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={18}>
                <Form.Item label="รายละเอียดทั่วไปของร้านค้า" hasFeedback>
                  <Input.TextArea
                    rows={rowsStoreDetail}
                    type="text"
                    value={storeDetail}
                    style={{ width: "100%" }}
                    name="storeDetail"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Button type="primary" onClick={this.submitForm}>
            Submit
          </Button>
        </Row>
      </DefaultLayout>
    );
  }
}
