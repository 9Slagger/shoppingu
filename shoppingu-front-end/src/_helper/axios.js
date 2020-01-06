import axios from "axios";
import { ENDPOINT } from "../_constants";
import { getToken } from "../_helper/localStorage";

axios.defaults.baseURL = ENDPOINT;
axios.interceptors.request.use(config => {
  config.headers.Authorization = !!getToken()
    ? `Bearer ${getToken().slice(1, getToken().length - 1)}`
    : "Bearer ";
  return config;
});

export default axios;
