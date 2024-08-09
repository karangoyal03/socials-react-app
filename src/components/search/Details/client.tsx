import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const REVIEW_API = `${REMOTE_SERVER}/api/reviews`;

export const deleteReview = async (userId: string) => {
  const response = await axios.delete(`${REVIEW_API}/${userId}`);
  return response.data;
};

export const findAllReviews = async () => {
  const response = await axios.get(`${REVIEW_API}`);
  return response.data;
};

export const findReviewByUserId = async (userId: string) => {
  const response = await axios.get(`${REVIEW_API}/${userId}`);
  return response.data;
};

export const finReviewByTitle = async (title: string) => {
  const response = await axios.get(`${REVIEW_API}/${title}`);
  return response.data;
};
export const createReview = async (review: any) => {
  const response = await axios.post(`${REVIEW_API}`, review);
  return response.data;
};

export const updateReview = async (userId: string, review: any) => {
  const response = await axios.put(`${REVIEW_API}/${userId}`, review);
  return response.data;
};
