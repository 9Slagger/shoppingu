import axios from "../_helper/axios";

const serviceProduct = {
  getProduct: productId =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get(`/product/publish/${productId}`);
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  getPublishProduct: () =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get("/product/publish");
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  modifyProduct: (
    productId,
    StoreId,
    productTypeId,
    productName,
    productDetail,
    salePrice,
    netDiscountPrice,
    isSale
  ) =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.patch(`/product/${productId}/store/${StoreId}`, {
          // productTypeId,
          productName,
          productDetail,
          salePrice,
          netDiscountPrice,
          isSale
        });
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  addProductToStore: (
    storeId,
    productTypeCode,
    productName,
    isSale,
    productDetail,
    salePrice,
    netDiscountPrice,
    amount
  ) =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.post(`/product/${storeId}/${productTypeCode}`, {
          productName,
          isSale,
          productDetail,
          salePrice,
          netDiscountPrice,
          amount
        });
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  getProductFromStore: StoreId =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get(`/product/store/${StoreId}`);
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    })
};

export { serviceProduct };
