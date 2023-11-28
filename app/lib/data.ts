import axios, { AxiosInstance } from "axios";

export const _loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post("/api/auth/login", {
    email: data.email,
    password: data.password,
  });
  if (response.status === 200) {
    return response.data;
  }
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
  if (response.status === 200) {
    return response.data;
  }
};

export const _getUser = async (axios: AxiosInstance) => {
  const response = await axios.get("/api/auth/getUser");
  if (response.status === 200) {
    return response.data;
  }
};
