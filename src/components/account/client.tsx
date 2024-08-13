import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USER_API = `${REMOTE_SERVER}/api/users`;
export const REVIEW_API = `${REMOTE_SERVER}/api/reviews`;
export const USERBYOBJECT_API = `${REMOTE_SERVER}/api/user`

export const getAllUsers = async () => {
  const response = await axios.get(`${USER_API}`);
  return response.data;
};

export const findUserById = async(_id : String)=>{
  const response = await axios.get(`${USERBYOBJECT_API}/${_id}`)
  return response.data;
}

export const signin = async (credentials: any) => {
  const response = await axios.post(`${USER_API}/login`, credentials);
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

export const updateUser = async (userId: String, user: any) => {
  const response = await axios.put(`${USER_API}/${userId}`, user);
  return response.data;
};

export const followUser = async (userId: String, _id: String) => {
  const response = await axios.put(`${USER_API}/follow/${userId}`, {_id});
  return response.data;
};

export const unfollowUser = async (userId: String, _id: String) => {
  const response = await axios.put(`${USER_API}/unfollow/${userId}`, {_id});
  return response.data;
};

export const findReviewsByUserId = async (userId: String) => {
  const response = await axios.get(`${REVIEW_API}/${userId}`);
  return response.data;
};


export const deleteUser = async(userId : String) =>{
  const response = await axios.delete(`${USER_API}/${userId}`);
  return response.data;
}