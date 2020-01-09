import React, { Component } from "react";
import DefaultLayout from "../commonComponents/DefaultLayout";
import { Row, Col, Form, Input, DatePicker, Button, notification } from "antd";
import moment from "moment";
import { serviceAuth } from "../_services";
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      birthday: new Date()
    };
  }

  validateEmail = email => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  submitForm = async () => {
    let {
      email,
      password,
      confirmPassword,
      phoneNumber,
      firstName,
      lastName,
      birthday
    } = this.state;
    let message,
      description = [],
      duration = 2,
      tempBirthday;
    //preparedata
    tempBirthday = birthday;
    birthday = {};
    birthday.year = tempBirthday.getFullYear();
    birthday.month = tempBirthday.getMonth();
    birthday.date = tempBirthday.getDate() + 1;
    if (!this.validateEmail(email)) {
      description.push("E-Mail ไม่ถูกต้องตามฟอร์ม");
    }
    if (password.length < 8) {
      description.push("Password ต้องมีความยาวมากกว่า 8 ตัว");
    }
    if (password !== confirmPassword) {
      description.push("Password และ Confirm Password ไม่ตรงกัน");
    }
    if (phoneNumber.length !== 10) {
      description.push("เบอร์โทรต้องมีี 10 หลัก");
    }
    if (firstName.length === 0) {
      description.push("FirstName ต้องไม่ว่าง");
    }
    if (lastName.length === 0) {
      description.push("LastName ต้องไม่ว่าง");
    }
    if (description.length !== 0) {
      message = "คุณกรอกข้อมูลไม่ถูกต้อง !";
      duration = 10;
    } else {
      try {
        await serviceAuth.signup({
          email,
          password,
          phoneNumber,
          firstName,
          lastName,
          birthday
        });
        message = "Signup Success";
        description.push("สมัครสมาชิกสำเร็จ");
        this.props.history.push("/");
      } catch (error) {
        message = "Signup Fail";
        description.push("someting wrong");
      }
    }
    if (description.length > 1) {
      description = description.map((data, index) => `${index + 1}. ${data} `);
    }
    notification.open({
      message,
      description,
      duration
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDatePicker = e => {
    if (e && e._d) this.setState({ birthday: e._d });
  };
  
  render() {
    const {
      email,
      password,
      confirmPassword,
      phoneNumber,
      firstName,
      lastName,
      birthday
    } = this.state;
    return (
      <DefaultLayout {...this.props}>
        <Row>
          <h3>Signup</h3>
          <Form>
            <Row gutter={[16, 0]}>
              <Col lg={8}>
                <Form.Item label="E-mail">
                  <Input
                    type="text"
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Password" hasFeedback>
                  <Input.Password
                    type="password"
                    value={password}
                    name="password"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item label="Confirm Password" hasFeedback>
                  <Input.Password
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={this.handleChange}
                    onBlur={this.handleConfirmBlur}
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <Form.Item label="FirstName">
                  <Input
                    type="text"
                    value={firstName}
                    name="firstName"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <Form.Item label="LastName">
                  <Input
                    type="text"
                    value={lastName}
                    name="lastName"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <Form.Item label="Phone Number">
                  <Input
                    type="text"
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={this.handleChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col lg={6}>
                <Form.Item label="Birthday">
                  <DatePicker
                    name="birthday"
                    onChange={this.handleChangeDatePicker}
                    defaultValue={moment(birthday, "DD/MM/YYYY")}
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
