import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
export const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });
  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
