import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const SHOW_API = `${REMOTE_SERVER}/api/shows`;

export const deleteMovie = async (title: string) => {
  const response = await axios.delete(`${SHOW_API}/${title}`);
  return response.data;
};

export const findAllShows = async() =>{
  const response = await axios.get(`${SHOW_API}`);
  return response.data;
}

export const findShowByTitle = async (title: string) => {
  const response = await axios.get(`${SHOW_API}/${title}`);
  return response.data;
};
export const createShow = async (title: string, show: any) => {
  const response = await axios.post(`${SHOW_API}/${title}`, show);
  return response.data;
};

export const updateShow = async (show: any) => {
  const response = await axios.put(`${SHOW_API}/${show.title}`, show);
  return response.data;
};
