// import axios from "axios";
// import { ENDPOINT } from "../constants";

const serviceApi = {
  login: obj =>
    new Promise(async (resolve, reject) => {
      resolve({data: "JKASBDKJASBDKJ"});
    })
  // login: obj =>
  //   new Promise(async (resolve, reject) => {
  //     let result;
  //     try {
  //       result = await axios.post(`${ENDPOINT}/user/login`, obj);
  //       resolve(result);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   })
};

export default serviceApi;
