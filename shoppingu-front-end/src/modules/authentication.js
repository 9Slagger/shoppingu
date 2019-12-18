import { getToken, setToken, removeToken } from "../services/localStorage";

const Auth = {
  isAuthenticated: !!getToken(),
  signin: (obj, callback) => {
    Auth.isAuthenticated = true;
    setToken(obj);
    callback();
  },
  signout: callback => {
    Auth.isAuthenticated = false;
    removeToken();
    callback();
  }
};

export default Auth;
