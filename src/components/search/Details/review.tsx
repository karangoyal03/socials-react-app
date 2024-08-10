import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import * as client from "./client";
import { useSelector } from "react-redux";

interface Review {
  _id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  title :string;
}

interface ReviewProps {
  movieTitle: string;
}

const Reviews: React.FC<ReviewProps> = ({ movieTitle }) => {
  const account = useSelector((state: any) => state.account);
  const currentUser = account ? account.currentUser : null;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [updatedComment, setUpdatedComment] = useState<string>("");
  const [updatedRating, setUpdatedRating] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await client.findAllReviews();
        const filteredReviews = fetchedReviews.filter(
          (review: Review) => review.title === movieTitle
        );
        filteredReviews.sort(
          (a: Review, b: Review) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
  
    fetchReviews();
  }, [movieTitle]);
  

  const handleDelete = async (id: string) => {
    try {
      await client.deleteReview(id);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const handleUpdate = (review: Review) => {
    setSelectedReview(review);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
    setShowModal(true);
  };

  const handleSaveUpdate = async () => {
    if (selectedReview) {
      try {
        await client.updateReview(selectedReview._id, {
        ...selectedReview,
          comment: updatedComment,
          rating: updatedRating,
        });
        setReviews(
          reviews.map((review) =>
            review._id === selectedReview._id
              ? { ...review, comment: updatedComment, rating: updatedRating }
              : review
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error("Failed to update review:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReview(null);
    setUpdatedComment("");
    setUpdatedRating(0);
  };

  const canDelete =
    currentUser &&
    (currentUser.role === "ADMIN" || currentUser.role === "BLOGGER");
  const canEdit =
    currentUser &&
    (currentUser.role === "ADMIN" || currentUser.role === "USER");

  return (
    <div className="mt-4">
      <h3 className="text-primary">Reviews</h3>
      {reviews.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.username}</td>
                <td>
                  {Array(review.rating)
                    .fill(null)
                    .map((_, i) => (
                      <span key={i} className="text-warning">
                        ★
                      </span>
                    ))}
                  {Array(10 - review.rating)
                    .fill(null)
                    .map((_, i) => (
                      <span key={i} className="text-secondary">
                        ★
                      </span>
                    ))}
                </td>
                <td>{review.comment}</td>
                <td>{new Date(review.date).toLocaleDateString()}</td>
                <td>
                  {canEdit && (
                    <Button
                      variant="link"
                      className="p-0 text-primary"
                      onClick={() => handleUpdate(review)}
                    >
                      <FaEdit />
                    </Button>
                  )}{" "}
                  {canDelete && (
                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No reviews available for this movie.</p>
      )}

      {/* Modal for updating the review */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={updatedRating}
                onChange={(e) => setUpdatedRating(Number(e.target.value))}
              >
                <option value={0}>Select Rating</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Star{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reviews;
