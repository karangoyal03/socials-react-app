import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "./../context/userContext"; // Import UserContext with the correct type
import * as client from "./client";
interface User {
  id: number;
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userPic?: string;
  loginId: string;
  followers: string[]; // Array of loginIds who follow this user
}

interface UserContextType {
  user: User | null;
}

export default function AllUserProfiles() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user: currentUser , fetchUser } = context; // Now TypeScript knows 'user' exists on context
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const data: User[] = await client.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 
    fetchUsers();
  }, []);

  const handleFollow = async (_id: string) => {
    if (!currentUser || !currentUser.loginId) {
      console.error("Current user is not available.");
      return;
    }

    try {
      await client.followUser(currentUser._id, _id);
      await fetchUsers();
      await fetchUser();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === _id
            ? { ...user, followers: [...user.followers, currentUser.loginId] }
            : user
        )
      );
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async (_id: string) => {
    if (!currentUser || !currentUser.loginId) {
      console.error("Current user is not available.");
      return;
    }


    try {
      await client.unfollowUser(currentUser._id, _id);
      await fetchUsers();
      await fetchUser();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === _id
            ? {
                ...user,
                followers: user.followers.filter(
                  (followerId) => followerId !== currentUser.loginId
                ),
              }
            : user
        )
      );
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  const handleDelete = async (loginId: string) => {
    try {
      await client.deleteUser(loginId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.loginId !== loginId)
      );
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Explore and Connect with Users</h2>
      <Row>
        {users.map((user) => (
          <Col key={user._id} sm={12} md={6} lg={4} className="mb-4">
            <Card
              style={{
                border:
                  currentUser && currentUser._id === user._id
                    ? "2px solid gold"
                    : "",
              }}
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={4} className="text-center">
                    <FaUserCircle size={80} color="gray" />
                  </Col>
                  <Col md={8}>
                    <h5>
                      {user.username}{" "}
                      {currentUser && currentUser._id === user._id && (
                        <span
                          style={{
                            backgroundColor: "gold",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            color: "black",
                          }}
                        >
                          You
                        </span>
                      )}
                    </h5>
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
                    {currentUser?.role === "USER" &&
                      currentUser._id !== user._id && (
                        <div className="d-flex justify-content-between">
                          {user.followers.includes(currentUser._id) ? (
                            <Button
                              variant="danger"
                              onClick={() => handleUnfollow(user._id)}
                            >
                              Unfollow
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={() => handleFollow(user._id)}
                            >
                              Follow
                            </Button>
                          )}
                        </div>
                      )}
                    {currentUser?.role === "ADMIN" &&
                      currentUser._id !== user._id && (
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(user.loginId)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
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
