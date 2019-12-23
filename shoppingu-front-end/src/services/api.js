// import axios from "axios";
// import { ENDPOINT } from "../constants";
import { removeToken, setToken } from "./localStorage";

const serviceApi = {
  login: obj =>
    new Promise(async (resolve, reject) => {
      setToken({ data: "JKASBDKJASBDKJ" })
      resolve({ data: "JKASBDKJASBDKJ" });
    }),
  // login: obj =>
  //   new Promise(async (resolve, reject) => {
  //     let result;
  //     try {
  //       result = await axios.post(`${ENDPOINT}/user/login`, obj);
  //       localStorage.setItem('token', result.data);
  //       resolve(result);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   })
  logout: () =>
    new Promise(async (resolve, reject) => {
      removeToken()
      resolve()
    })
};

export default serviceApi;
