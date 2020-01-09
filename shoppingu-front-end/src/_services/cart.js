import axios from "../_helper/axios";

const serviceCart = {
  updateMyCart: (productId, amount) =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.put("/cart", { productId, amount });
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  getProductInMyCart: () =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.get("/cart");
        resolve(result.data);
      } catch (error) {
        reject(error.response.data);
      }
    })
};

export { serviceCart };
