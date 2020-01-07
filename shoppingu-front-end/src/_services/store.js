import axios from "../_helper/axios";

const serviceStore = {
  publishStore: (id, status) =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.patch(`/store/publish/${id}`, { status });
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  approveStore: id =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.patch(`/store/approve/${id}`);
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  getStoreNotApprove: () =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get("/store/notapprove");
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  getMyStore: () =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get("/store/me");
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
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
      let result;
      try {
        result = await axios.post("/store", {
          storeName,
          storeDetail,
          storeTypeCode
        });
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    })
};

export { serviceStore };
