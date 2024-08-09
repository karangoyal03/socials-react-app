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


export const findReviewByTitle = async (title: string) => {
    try {
      const response = await axios.get(`${REVIEW_API}/${encodeURIComponent(title)}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch review for title: ${title}`, error);
      throw new Error('Could not fetch the review. Please try again later.');
    }
  };
export const createReview = async (review: any) => {
  const response = await axios.post(`${REVIEW_API}`, review);
  return response.data;
};

export const updateReview = async (_id: string, review: any) => {
  const response = await axios.put(`${REVIEW_API}/${_id}`, review);
  return response.data;
};
