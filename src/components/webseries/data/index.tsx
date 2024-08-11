import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import "./webseries.css";

interface TvShow {
  id: number;
  name: string;
  Plot: string;
  Poster: string;
  Title: string;
  original_name: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  totalSeasons?: string;
}

interface Review {
  username: string;
  title: string;
  rating: number;
  comment: string;
  date: string;
  userId: string;
}

const WebSeries: React.FC = () => {
  const [shows, setShows] = useState<TvShow[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedShow, setSelectedShow] = useState<TvShow | null>(null);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newShow, setNewShow] = useState<Partial<TvShow>>({});

  const navigate = useNavigate();

  const account = useSelector((state: any) => state.account);
  const currentUser = account ? account.currentUser : null;

  const canPostReview =
    currentUser &&
    (currentUser.role === "USER" || currentUser.role === "ADMIN");

  const canCreateShow =
    currentUser &&
    (currentUser.role === "ADMIN" || currentUser.role === "BLOGGER");

  const fetchShows = async () => {
    const shows = await client.findAllShows();
    setShows(shows);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleDetailsClick = (show: TvShow) => {
    navigate(`/details/${show.Title}`, { state: { show } });
  };

  const handleReview = (show: TvShow) => {
    if (canPostReview) {
      setSelectedShow(show);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setComment("");
    setRating(0);
  };

  const handleSaveReview = async () => {
    if (currentUser && selectedShow) {
      const review: Review = {
        username: currentUser.username,
        userId: currentUser.loginId,
        title: selectedShow.Title,
        rating: rating,
        comment: comment,
        date: new Date().toISOString(),
      };

      try {
        await client.createReview(review);
        handleCloseModal();
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=${searchQuery}`
      );
      const data = await res.data;
      if (data.Response === "False") {
        setSearchError("Title of the show is incorrect.");
      } else {
        setSearchError("");
        navigate(`/details/${data.Title}`, { state: { show: data } });
      }
    } catch (error) {
      setSearchError("Internal Server Error");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCreateShow = async () => {
    if (newShow.Title) {
      try {
        await client.createShow(newShow);
        setShowCreateModal(false);
        fetchShows();
      } catch (error) {
        console.error("Failed to create show:", error);
      }
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewShow((prevShow) => ({
      ...prevShow,
      [name]: value,
    }));
  };

  return (
    <Container className="my-5">
      {currentUser === null && (
        <Alert variant="warning" className="text-center">
          You are currently an anonymous user. Please sign in to continue on the
          website.
        </Alert>
      )}
      <h1 className="text-center mb-4">Popular TV Shows</h1>

      <InputGroup className="mb-4">
        <FormControl
          placeholder="Search for a TV show..."
          aria-label="Search for a TV show"
          aria-describedby="basic-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="ml-2 d-flex">
          <Button variant="primary" id="button-search" onClick={handleSearch} className="mr-2">
            Search
          </Button>
          {canCreateShow && (
            <Button variant="success" onClick={() => setShowCreateModal(true)}>
              Create Show
            </Button>
          )}
        </div>
      </InputGroup>

      {searchError && <Alert variant="danger">{searchError}</Alert>}

      <Row>
        {shows.map((show) => (
          <Col key={show.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={show.Poster}
                  className="card-img"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{show.name}</Card.Title>
                <Card.Text className="text-muted">
                  {show.Plot
                    ? show.Plot.length > 100
                      ? `${show.Plot.substring(0, 100)}...`
                      : show.Plot
                    : "Plot not available"}
                </Card.Text>

                <div className="mt-auto d-flex flex-column">
                  <Button
                    variant="primary"
                    className="w-100 mb-2"
                    onClick={() => handleReview(show)}
                    disabled={!canPostReview}
                  >
                    Post Review
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => handleDetailsClick(show)}
                  >
                    More Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Review Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Post Review for {selectedShow?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reviewForm.ControlTextarea">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
              />
            </Form.Group>
            <Form.Group controlId="reviewForm.ControlRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={0}>Select Rating</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Star{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveReview}>
            Save Review
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Show Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="createShowForm.Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="Title"
                value={newShow.Title || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Year" className="mt-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="Year"
                value={newShow.Year || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Rated" className="mt-3">
              <Form.Label>Rated</Form.Label>
              <Form.Control
                type="text"
                name="Rated"
                value={newShow.Rated || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Released" className="mt-3">
              <Form.Label>Released</Form.Label>
              <Form.Control
                type="text"
                name="Released"
                value={newShow.Released || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Runtime" className="mt-3">
              <Form.Label>Runtime</Form.Label>
              <Form.Control
                type="text"
                name="Runtime"
                value={newShow.Runtime || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Genre" className="mt-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="Genre"
                value={newShow.Genre || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Director" className="mt-3">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                name="Director"
                value={newShow.Director || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Writer" className="mt-3">
              <Form.Label>Writer</Form.Label>
              <Form.Control
                type="text"
                name="Writer"
                value={newShow.Writer || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Actors" className="mt-3">
              <Form.Label>Actors</Form.Label>
              <Form.Control
                type="text"
                name="Actors"
                value={newShow.Actors || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Plot" className="mt-3">
              <Form.Label>Plot</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Plot"
                value={newShow.Plot || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Language" className="mt-3">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                name="Language"
                value={newShow.Language || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Country" className="mt-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="Country"
                value={newShow.Country || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.Awards" className="mt-3">
              <Form.Label>Awards</Form.Label>
              <Form.Control
                type="text"
                name="Awards"
                value={newShow.Awards || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="createShowForm.totalSeasons" className="mt-3">
              <Form.Label>Total Seasons</Form.Label>
              <Form.Control
                type="text"
                name="totalSeasons"
                value={newShow.totalSeasons || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateShow}>
            Save Show
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WebSeries;
