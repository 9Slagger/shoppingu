import React from "react";
import { Card } from "antd";

export default props => {
  const getPercent = (netPrice, salePrice) => {
    let result = (100 - (netPrice / salePrice) * 100).toFixed(0);
    if (result > Number.MIN_SAFE_INTEGER) {
      return result * -1;
    } else {
      return 0;
    }
  }
  const { product } = props;
  return (
    <Card
      hoverable
      style={{  width: "100%" }}
      cover={<img alt="" src={product.image} />}
    >
      <div className="product-card">
        <label
          style={{
            color: "#333333",
            fontSize: "14px"
          }}
        >
          <strong>{product.productName}</strong>
        </label>
      </div>
      <br />
      <label style={{ color: "tomato", fontSize: "16px" }}>
        <strong>${product.netPrice}</strong>
      </label>
      <br />
      <label style={{ color: "777777", fontSize: "12px" }}>
        <s>${product.salePrice}</s>{" "}
        {getPercent(product.netPrice, product.salePrice)}%
      </label>
    </Card>
  );
};
