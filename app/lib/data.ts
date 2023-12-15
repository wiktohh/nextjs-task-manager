import axios, { AxiosInstance } from "axios";

export const _loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post("/api/auth/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const _registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  secondPassword: string;
}) => {
  const response = await axios.post("/api/auth/register", {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    secondPassword: data.secondPassword,
  });
  return response.data;
};

export const _getUser = async (axios: AxiosInstance) => {
  const response = await axios.get("/api/auth/getUser");
  return response.data;
};

export const _getTasks = async () => {
  const response = await axios.get("/api/tasks");
  return response.data;
};
