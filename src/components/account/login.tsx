import React, { useState, FormEvent } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const credentials = {
        email,
        password,
      };
      const currentUser = await client.signin(credentials);
      dispatch(setCurrentUser(currentUser));
      navigate("/home");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Navigation />
      <Container className="vh-100">
        {error && <div className="wd-error alert alert-danger">{error}</div>}
        <Row className="h-100 justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow">
              <h3 className="text-center mb-4">Sign In</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              <div>
                {" "}
                <p className="forgot-password text-right">
                  create new account <Link to="/signup">sign up?</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
