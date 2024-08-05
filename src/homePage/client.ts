import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);

export const fetchLatestContent = async () => {
  try {
    console.log(`Fetching from ${API_BASE_URL}/latest-content`);
    const response = await axios.get(`${API_BASE_URL}/latest-content`);
    console.log("Latest content response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest content", error);
    throw error;
  }
};

export const fetchUserLatestContent = async (userId: string) => {
  try {
    console.log(`Fetching from ${API_BASE_URL}/user/${userId}/latest-content`);
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/latest-content`);
    console.log("User content response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user content", error);
    throw error;
  }
};
