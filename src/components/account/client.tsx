import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USER_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axios.post(`${USER_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axios.post(`${USER_API}/signup`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${USER_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USER_API}/signout`);
  return response.data;
};
