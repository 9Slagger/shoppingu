import React, { PureComponent } from "react";
import { Row, Col } from "antd";

export default class NotFound extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 3
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({ count: prevState.count - 1 }));
    }, 1000);
    setTimeout(() => {
      this.props.history.push("/");
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { count } = this.state;
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: "100vh" }}
      >
        <Col>
          <h1>404 Page Not Found</h1>
          <h2>Redirect to Home in {count}</h2>
        </Col>
      </Row>
    );
  }
}
