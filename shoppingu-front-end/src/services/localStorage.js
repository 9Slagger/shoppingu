export const getToken = () => localStorage.getItem("token");
export const setToken = (obj) => localStorage.setItem("token", obj)
export const removeToken = () => localStorage.removeItem("token")