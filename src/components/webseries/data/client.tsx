import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const SHOW_API = `${REMOTE_SERVER}/api/shows`;
const REVIEW_API = `${REMOTE_SERVER}/api/reviews`;

export const deleteMovie = async (title: string) => {
  const response = await axios.delete(`${SHOW_API}/${title}`);
  return response.data;
};

export const createReview = async (review: any) => {
  const response = await axios.post(`${REVIEW_API}`,review);
  return response.data;
};

export const findAllShows = async () => {
  const response = await axios.get(`${SHOW_API}`);
  return response.data;
};

export const findShowByTitle = async (title: string) => {
  const response = await axios.get(`${SHOW_API}/${title}`);
  return response.data;
};
export const createShow = async ( show: any) => {
  const response = await axios.post(`${SHOW_API}`, show);
  return response.data;
};

export const updateShow = async (show: any) => {
  const response = await axios.put(`${SHOW_API}/${show.title}`, show);
  return response.data;
};
