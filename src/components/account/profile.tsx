import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Card,
  Row,
  Col,
  Alert,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as client from "./client";

export default function Profile() {
  const account = useSelector((state: any) => state.account);
  const currentUser = account ? account.currentUser : null;
  const [reviews, setReviews] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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

  const handleShowModal = () => {
    setUpdatedUser({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await client.updateUser(currentUser.loginId, updatedUser);
      handleCloseModal();
      // Optionally, refresh the profile data after the update
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

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
                  <Button variant="primary" onClick={handleShowModal}>
                    Update Profile
                  </Button>
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

          {/* Update Profile Modal */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={updatedUser.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Alert variant="danger">User is not yet logged in.</Alert>
      )}
    </Container>
  );
}
