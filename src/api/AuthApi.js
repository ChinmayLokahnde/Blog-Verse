

import axios from "./AxiosInstance";

export const loginUser = async (data) => {
  const res = await axios.post("/auth/login", data);
  const {token, user} = res.data

  return{...user, token};
};

export const registerUser = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};
