import React from "react";
import DisplayData from "../webseries/data";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Container className="mt-4">
        <h1 className="text-center mb-4">Welcome to MovieVerse</h1>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>The Epic Adventures of Space Rangers</Card.Title>
                <Card.Text>
                  Follow the intergalactic journey of a fearless team of space rangers as they battle alien forces, discover new worlds, and protect the galaxy from evil. This action-packed series is full of twists and turns that will keep you on the edge of your seat.
                </Card.Text>
                <Link to="/movies">
                  <Button variant="primary">Explore More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Haunted Nights: The Rise of the Dark Shadows</Card.Title>
                <Card.Text>
                  Dive into the world of horror with "Haunted Nights," where dark shadows come alive, and every corner holds a terrifying secret. This spine-chilling series is a must-watch for fans of supernatural thrillers and ghost stories.
                </Card.Text>
                <Link to="/movies">
                  <Button variant="primary">Explore More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>The Chronicles of Ancient Empires</Card.Title>
                <Card.Text>
                  Step back in time with "The Chronicles of Ancient Empires" as it brings to life the stories of the most powerful civilizations that ever existed. From epic battles to political intrigue, this series is a historical drama that you won't want to miss.
                </Card.Text>
                <Link to="/movies">
                  <Button variant="primary">Explore More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Comedy Central: Laugh Out Loud</Card.Title>
                <Card.Text>
                  Get ready to laugh until your sides hurt with "Comedy Central: Laugh Out Loud." This comedy series brings together the best stand-up acts and hilarious sketches that are sure to brighten your day and leave you in stitches.
                </Card.Text>
                <Link to="/movies">
                  <Button variant="primary">Explore More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
