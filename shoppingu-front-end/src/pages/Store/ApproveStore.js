import React, { Component } from "react";
import serviceStore from "../../_services/store";
import DefaultLayout from "../../components/DefaultLayout";
import { Row, Col, Table, Divider, Tag, notification } from "antd";
import { APPROVE, REJECT } from "../../_constants";

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
        this.showNotification(result.messages);
      } catch (error) {
        this.showNotification(error.messages);
      }
    } else if (REJECT) {
      alert("coming soon");
    }
  };

  async getStoreNotApprove() {
    console.log("debug");
    let storeList;
    try {
      storeList = await serviceStore.getStoreNotApprove();
      storeList = storeList.result;
      // preparedata
      storeList = storeList.map(data => ({ ...data, key: data.id }));
    } catch (error) {
      this.showNotification(error.messages);
    }
    this.setState({ storeList });
  }

  showNotification(messages, description = "", duration = 2) {
    if (Array.isArray(messages) && messages.length) {
      notification.info({
        message: messages,
        description,
        duration,
        placement: "topRight"
      });
      this.props.clearMessages();
    }
  }

  render() {
    const { columns, storeList } = this.state;
    console.log(storeList);
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
