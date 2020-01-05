import axios from "axios";
import { ENDPOINT } from "../_constants";
import { getToken } from "../_helper/localStorage";

axios.defaults.baseURL = ENDPOINT;
axios.defaults.headers.common["Authorization"] = getToken();

export default axios