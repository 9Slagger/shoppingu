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
  };
  const { product, history } = props;

  const toPageProductView = productId => () => {
    history.push(`/view/product/${window.btoa(productId)}`);
  };

  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          alt=""
          style={{height: "130px"}}
          src={
            product.files && product.files.length
              ? `http://localhost:8080/${product.files[0].id}${product.files[0].filename_extension}`
              : "https://www.tellerreport.com/images/no-image.png"
          }
        />
      }
      onClick={toPageProductView(product.id)}
    >
      <div className="product-card">
        <label
          style={{
            color: "#333333",
            fontSize: "14px"
          }}
        >
          <strong>{product.product_name}</strong>
        </label>
      </div>
      <br />
      <label style={{ color: "tomato", fontSize: "16px" }}>
        <strong>฿{product.net_discount_price}</strong>
      </label>
      <br />
      <label style={{ color: "777777", fontSize: "12px" }}>
        <s>฿{product.sale_price}</s>{" "}
        {getPercent(product.net_discount_price, product.sale_price)}%
      </label>
    </Card>
  );
};
