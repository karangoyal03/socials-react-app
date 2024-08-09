import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col, Alert, Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as client from "./client";

export default function Profile() {
  const account = useSelector((state: any) => state.account);
  const currentUser = account ? account.currentUser : null;
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (currentUser) {
        try {
          const userReviews = await client.findReviewsByUserId(
            currentUser.loginId
          );
          setReviews(userReviews);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        }
      }
    };

    fetchReviews();
  }, [currentUser]);

  return (
    <Container className="mt-5">
      {currentUser ? (
        <>
          <Card className="mb-4">
            <Card.Header as="h2">Profile</Card.Header>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  <FaUserCircle size={120} color="gray" /> {/* User icon */}
                </Col>
                <Col md={8}>
                  <h4>{currentUser.username}</h4>
                  <p>
                    <strong>First Name:</strong> {currentUser.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {currentUser.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {currentUser.role}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {reviews.length > 0 ? (
            <Card>
              <Card.Header as="h3">My Reviews</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Movie Title</th>
                      <th>Comment</th>
                      <th>Rating</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.id}>
                        <td>{review.title}</td>
                        <td>{review.comment}</td>
                        <td>{review.rating}</td>
                        <td>{new Date(review.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info">You have not posted any reviews yet.</Alert>
          )}
        </>
      ) : (
        <Alert variant="danger">User is not yet logged in.</Alert>
      )}
    </Container>
  );
}
