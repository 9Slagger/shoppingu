import axios from "../_helper/axios";

const serviceProductType = {
  getProductType: () =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get("/producttype");
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    })
};

export { serviceProductType };
