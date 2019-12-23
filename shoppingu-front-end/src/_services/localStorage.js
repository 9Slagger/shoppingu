import { ACCESS_TOKEN } from "../_constants";
export const getToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setToken = obj => localStorage.setItem(ACCESS_TOKEN, obj);
export const removeToken = () => localStorage.removeItem(ACCESS_TOKEN);
