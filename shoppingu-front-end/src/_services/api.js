// import axios from "axios";
// import { ENDPOINT } from "../constants";
import { removeToken, setToken } from "./localStorage";

const serviceApi = {
  signin: obj =>
    new Promise(async (resolve, reject) => {
      const mock = {
        data: {
          token: "SADNJKFBN",
          id: 1,
          role: "USER",
          firstName: "Akkarapong",
          lastName: "Khamtanet",
          profileImage: ""
        }
      };
      setToken(JSON.stringify(mock));
      resolve(mock);
    }),
  // signin: obj =>
  //   new Promise(async (resolve, reject) => {
  //     let result;
  //     try {
  //       result = await axios.post(`${ENDPOINT}/user/signin`, obj);
  //       localStorage.setItem('token', result.data);
  //       resolve(result);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   })
  signout: () =>
    new Promise(async (resolve, reject) => {
      removeToken();
      resolve();
    })
};

export default serviceApi;
