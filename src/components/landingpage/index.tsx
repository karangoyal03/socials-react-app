import React from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProjectDetails() {
  const teamMembers = ["Karan Goyal", "Sree Nikitha Reddy Doddareddy"];

  return (
    <Container className="my-5">
      <Row className="text-center mb-4">
        <Col>
          <h2 className="display-4">Web Dev Project - Summer Full</h2>
          <p className="lead text-muted" style={{ color: "white" }}>
            Section: GYM
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <Card.Title className="mb-4">
                <h3>Team Details</h3>
              </Card.Title>
              <ListGroup variant="flush">
                {teamMembers.map((member, index) => (
                  <ListGroup.Item
                    key={index}
                    className={`py-3 ${index % 2 === 0 ? "bg-light" : ""}`}
                  >
                    <h5>
                      {index + 1}. {member}
                    </h5>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body className="text-center">
              <h4 className="mb-4">Project Links</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <a
                    id="wd-frontend-link"
                    href="https://github.com/karangoyal03/socials-react-app"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline-primary" className="w-100">
                      Frontend Repository
                    </Button>
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <a
                    id="wd-backend-link"
                    href="https://github.com/karangoyal03/socials-node-app"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline-secondary" className="w-100">
                      Backend Repository
                    </Button>
                  </a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link
                    id="wd-start"
                    to="/home"
                    className="text-decoration-none"
                  >
                    <Button variant="success" className="w-100">
                      Start Project
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
