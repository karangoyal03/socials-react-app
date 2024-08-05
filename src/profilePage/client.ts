import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProfile = async (profileId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile", error);
    throw error;
  }
};

export const fetchCurrentProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current profile", error);
    throw error;
  }
};

export const updateProfile = async (profileId: string, updateData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profile/${profileId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile", error);
    throw error;
  }
};
