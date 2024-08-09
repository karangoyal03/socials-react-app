import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons for update and delete
import * as client from "./client";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewProps {
  movieTitle: string;
}

const generateRandomId = (): string => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const generateRandomReviews = (): Review[] => {
  const users = ["Alice", "Bob", "Charlie", "Diana", "Edward"];
  const comments = [
    "Amazing movie!",
    "Loved the plot and characters.",
    "It was okay, nothing special.",
    "Didn't enjoy it much.",
    "Best movie of the year!",
  ];

  const reviews = [];
  for (let i = 0; i < 5; i++) {
    reviews.push({
      id: generateRandomId(),
      username: users[Math.floor(Math.random() * users.length)],
      rating: Math.floor(Math.random() * 10) + 1,
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
    });
  }
  return reviews;
};

const Reviews: React.FC<ReviewProps> = ({ movieTitle }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchedReviews = generateRandomReviews();
    fetchedReviews.sort(
      (a: Review, b: Review) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setReviews(fetchedReviews);
  }, [movieTitle]);

  const handleDelete = async (id: string) => {
    try {
      const updatedReviews = await client.deleteReview(id);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    const updatedComment = prompt("Enter new comment:");
    if (updatedComment) {
      try {
        const updatedReview = await client.updateReview(id, {
          comment: updatedComment,
        });
        setReviews(updatedReview);
      } catch (error) {
        console.error("Failed to update review:", error);
      }
    }
  };

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
              <th>Actions</th> {/* Added actions column */}
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
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
                  <Button
                    variant="link"
                    className="p-0 text-primary"
                    onClick={() => handleUpdate(review.id)}
                  >
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="link"
                    className="p-0 text-danger"
                    onClick={() => handleDelete(review.id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default Reviews;
