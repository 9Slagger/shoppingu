import React, { Component } from "react";
import { serviceStore } from "../../_services";
import DefaultLayout from "../../commonComponents/DefaultLayout";
import Notification from "../../commonComponents/Notification";
import { Row, Col, Table, Divider, Tag } from "antd";
import { APPROVE, REJECT } from "../../_constants";
import moment from "moment";

export default class approveStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "ชือร้านค้า",
          dataIndex: "store_name",
          key: "store_name"
        },
        {
          title: "รายละเอียดร้านค้า",
          dataIndex: "store_detail",
          key: "store_detail"
        },
        {
          title: "ประเภทร้านค้า",
          key: "store_type.store_type_name",
          dataIndex: "store_type.store_type_name"
        },
        {
          title: "ผู้สร้างคำร้อง",
          key: "users.email",
          dataIndex: "users.email",
          render: item => (
            <span>
              <Tag color="volcano" key={item}>
                {item}
              </Tag>
            </span>
          )
        },
        {
          title: "วันที่สร้างคำร้อง",
          dataIndex: "createdAt",
          key: "createdAt"
        },
        {
          title: "วันที่แก้ไขคำร้องล่าสุด",
          dataIndex: "updatedAt",
          key: "updatedAt"
        },
        {
          title: "Action",
          dataIndex: "data",
          key: "action",
          render: (text, { id }) => (
            <span>
              <label
                onClick={this.handleApproveOrReject(APPROVE, id)}
                style={{ color: "#3FA9FF", cursor: "pointer" }}
              >
                Approve
              </label>
              <Divider type="vertical" />
              <label
                onClick={this.handleApproveOrReject(REJECT, id)}
                style={{ color: "#3FA9FF", cursor: "pointer" }}
              >
                Reject
              </label>
            </span>
          )
        }
      ],
      storeList: []
    };
  }

  componentDidMount() {
    this.getStoreNotApprove();
  }

  handleApproveOrReject = (actionType, id) => async () => {
    if (actionType === APPROVE) {
      let result;
      try {
        result = await serviceStore.approveStore(id);
        this.getStoreNotApprove();
        Notification(result.messages)
      } catch (error) {
        Notification(error.messages)
      }
    } else if (REJECT) {
      alert("coming soon");
    }
  };

  async getStoreNotApprove() {
    let storeList;
    try {
      storeList = await serviceStore.getStoreNotApprove();
      storeList = storeList.result;
      // preparedata
      storeList = storeList.map(data => ({
        ...data,
        key: data.id,
        createdAt: moment(data.createdAt).format("DD/MM/YYYY h:mm"),
        updatedAt: moment(data.updatedAt).format("DD/MM/YYYY h:mm")
      }));
      this.setState({ storeList });
    } catch (error) {
      Notification(error.messages)
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
