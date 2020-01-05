import axios from "../_helper/axios";
import { removeToken, setToken } from "../_helper/localStorage";
// import { message } from "antd";

const serviceApi = {
  // signin: obj =>
  //   new Promise(async (resolve, reject) => {
  //     const mock = {
  //       data: {
  //         token: "SADNJKFBN",
  //         id: 1,
  //         role: "USER",
  //         firstName: "Akkarapong",
  //         lastName: "Khamtanet",
  //         profileImage: ""
  //       }
  //     };
  //     setToken(JSON.stringify(mock));
  //     resolve(mock);
  //   }),
  signin: obj =>
    new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await axios.post(`/signin`, obj);
        setToken(JSON.stringify(res.data.result.token));
        resolve(res.data);
      } catch (error) {
        reject(error.response.data);
      }
    }),
  signout: () =>
    new Promise(async (resolve, reject) => {
      removeToken();
      resolve({ messages: ["signout success"] });
    }),
  signup: obj =>
    new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await axios.post("/user", obj);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    })
};

export default serviceApi;
