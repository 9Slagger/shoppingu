import axios from "../_helper/axios";

const serviceAuth = {
  getStoreType: () =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get("/storetype");
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  createStore: (storeName, storeDetail, storeTypeCode) =>
    new Promise(async (resolve, reject) => {
      let result
      try {
        result = await axios.post("/store", {storeName, storeDetail, storeTypeCode})
        resolve(result.data)
      } catch (error) {
        reject(error.response.data)
      }
    })
};

export default serviceAuth;
