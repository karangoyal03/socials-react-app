import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as client from "./client";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userPic?: string;
}

export default function AllUserProfiles() {
  const [users, setUsers] = useState<User[]>([]); // Explicitly type users as an array of User objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await client.getAllUsers(); // Type the response as an array of User objects
        setUsers(data);
      } catch (error) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        {users.map((user) => (
          <Col key={user.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={4} className="text-center">
                    <FaUserCircle size={80} color="gray" />
                  </Col>
                  <Col md={8}>
                    <h5>{user.username}</h5>
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
        ))}
      </Row>
    </Container>
  );
}
