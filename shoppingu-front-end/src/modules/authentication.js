import { getToken, setToken, removeToken } from "../services/localStorage";

const Auth = {
  isAuthenticated: !!getToken(),
  signin: (obj, callback) => {
    Auth.isAuthenticated = true;
    setToken(obj);
    if (callback) callback();
  },
  signout: callback => {
    Auth.isAuthenticated = false;
    removeToken();
    if (callback) callback();
  }
};

export default Auth;
