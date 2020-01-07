import axios from "../_helper/axios";

const serviceProduct = {
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
    netDiscountPrice
  ) =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.post(`/product/${storeId}/${productTypeCode}`, {
          productName,
          isSale,
          productDetail,
          salePrice,
          netDiscountPrice
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
