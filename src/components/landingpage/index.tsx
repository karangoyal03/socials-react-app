import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProjectDetails() {
  const teamMembers = [
    'Karan Goyal',
    'Sree Nikitha Reddy Doddareddy'
  ];

  return (
    <Container className="my-5">
      <Row className="text-center mb-4">
        <Col>
          <h2>Section - Web Dev Project Summer Full</h2>
        </Col>
      </Row>
      <Row className="text-center mb-3 bg-light">
        <Col>
          <h3>Team Details Group Name - GYM</h3>
        </Col>
      </Row>
      {teamMembers.map((member, index) => (
        <Row key={index} className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-light'} mb-4`}>
          <Col>
            <h4>{index + 1}. {member}</h4>
          </Col>
        </Row>
      ))}
      <Row className="justify-content-center">
        <Col md={6}>
          <ListGroup>
            <ListGroup.Item>
              <a id="wd-frontend-link" href="https://github.com/karangoyal03/socials-react-app">
                Frontend
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a id="wd-backend-link" href="https://github.com/karangoyal03/socials-node-app">
                Backend
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link id="wd-start" to="/home">
                Start
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
