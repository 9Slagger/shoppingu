import React, { Component } from "react";
import { serviceStore } from "../../_services";
import DefaultLayout from "../../commonComponents/DefaultLayout";
import Notification from "../../commonComponents/Notification";
import {
  Row,
  Col,
  Table,
  Switch,
  Icon,
  Tag,
  Divider
} from "antd";
import moment from "moment";

export default class StoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "ชือร้านค้า",
          dataIndex: "store.store_name",
          key: "store.store_name"
        },
        {
          title: "ประเภทร้านค้า",
          key: "store.store_type.store_type_name",
          dataIndex: "store.store_type.store_type_name"
        },
        {
          title: "เจ้าของร้าน",
          key: "store.users.email",
          dataIndex: "store.users.email"
        },
        {
          title: "วันที่สร้างคำร้องเปิดร้านค้า",
          dataIndex: "createdAt",
          key: "createdAt"
        },
        {
          title: "วันที่แก้ไขร้านค้าล่าสุด",
          dataIndex: "updatedAt",
          key: "updatedAt"
        },
        {
          title: "ได้รับการอนุมัติ",
          dataIndex: "store.approved",
          key: "store.approved",
          render: (text, data) => (
            <Tag
              color={!!data["store.approved"] ? "green" : "geekblue"}
              key={data.key}
            >
              {!!data["store.approved"] ? "ได้รับการอนุมัติ" : "รอการอนุมัติ"}
            </Tag>
          )
        },
        {
          title: "เปิดร้านค้า",
          dataIndex: "data",
          key: "publish",
          render: (text, data) => (
            <Switch
              onClick={this.handlePublishStore(data["store.id"])}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              checked={!!data["store.is_active"]}
            />
          )
        },
        {
          title: "Action",
          dataIndex: "data",
          key: "action",
          render: (text, data) => (
            <span>
              <label
                onClick={this.toManageProductPage(data.storeId)}
                style={{ color: "#3FA9FF", cursor: "pointer" }}
              >
                จัดการสินค้า
              </label>
              <Divider type="vertical" />
              <label
                onClick={this.toEditStorePage(data.storeId)}
                style={{ color: "#3FA9FF", cursor: "pointer" }}
              >
                แก้ไขร้านค้า
              </label>
            </span>
          )
        }
      ],
      storeList: []
    };
  }

  componentDidMount() {
    this.getMyStore();
  }

  toManageProductPage = storeId => () => {
    this.props.history.push(`/store/${window.btoa(storeId)}/product/list`);
  };

  toEditStorePage = storeId => () => {
    this.props.history.push(`/store/edit/${window.btoa(storeId)}`);
  };

  handlePublishStore = id => async status => {
    let result;
    try {
      result = await serviceStore.publishStore(id, status);
      this.getMyStore();
      Notification(result.messages);
    } catch (error) {
      Notification(error.messages);
    }
  };

  async getMyStore() {
    let storeList;
    try {
      storeList = await serviceStore.getMyStore();
      storeList = storeList.result;
      // preparedata
      storeList = storeList.map(data => ({
        ...data,
        key: data.id,
        createdAt: moment(data.createdAt).format("DD/MM/YYYY h:mm"),
        updatedAt: moment(data.updatedAt).format("DD/MM/YYYY h:mm")
      }));
      //
      this.setState({ storeList });
    } catch (error) {
      Notification(error.messages);
    }
  }

  render() {
    const { columns, storeList } = this.state;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          <Col>
            <Table columns={columns} dataSource={storeList} />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
