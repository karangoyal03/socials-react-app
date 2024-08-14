import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function UserProfile() {
  const location = useLocation();
  const { user } = location.state;

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} md={8} lg={6} className="mx-auto mb-4">
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  <FaUserCircle size={100} color="gray" />
                </Col>
                <Col md={8}>
                  <h4>{user.username}</h4>
                  <p>
                    <strong>First Name:</strong> {user.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {user.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>Followers ({user.followers.length})</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {user.followers.map((followerId:any) => (
                <ListGroup.Item key={followerId}>
                  {/* Here you might want to display the follower's details like name, username, etc. */}
                  Follower ID: {followerId}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col sm={12} md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>Following ({user.following ? user.following.length : 0})</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {user.following?.map((followingId:any) => (
                <ListGroup.Item key={followingId}>
                  {/* Here you might want to display the following user's details like name, username, etc. */}
                  Following ID: {followingId}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
