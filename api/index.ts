import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.18.28:5000/",
});

export default api;

export const setAuthToken = (token: string | undefined) => {
  if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
      delete api.defaults.headers.common["Authorization"];
  }
};

