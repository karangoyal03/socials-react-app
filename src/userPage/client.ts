import axios from 'axios';
import { LoginResponse, Profile, User } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const registerUser = async (userData: any): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const loginUser = async (userData: any): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/users/login`, userData);
    console.log('loginUser response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
};

export const fetchProfile = async (userId: string): Promise<Profile> => {
  try {
    const response = await axios.get<Profile>(`${API_BASE_URL}/profile/${userId}`);
    console.log("fetch profile response:"+response);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error;
  }
};
