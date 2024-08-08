// MovieSearch.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
 
const apiKey = "d6a5c0d6";
 
const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
 
  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
    };
 
    try {
      const response = await axios.request(options);
      setMovieDetails(response.data);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching the movie details.');
      setMovieDetails(null);
    }
  };
 
  return (
<Container>
<Row className="justify-content-md-center mt-5">
<Col md="8">
<h1>Movie Search</h1>
<Form>
<Form.Group controlId="formMovieSearch">
<Form.Label>Enter movie name</Form.Label>
<Form.Control
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Enter movie name"
              />
</Form.Group>
<Button variant="primary" onClick={handleSearch}>
              Search
</Button>
</Form>
 
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {movieDetails && (
<Card className="mt-3">
<Card.Img variant="top" src={movieDetails.Poster} alt={movieDetails.Title} />
<Card.Body>
<Card.Title>{movieDetails.Title}</Card.Title>
<Card.Text><strong>Year:</strong> {movieDetails.Year}</Card.Text>
<Card.Text><strong>Genre:</strong> {movieDetails.Genre}</Card.Text>
<Card.Text><strong>Plot:</strong> {movieDetails.Plot}</Card.Text>
</Card.Body>
</Card>
          )}
</Col>
</Row>
</Container>
  );
};
 
export default MovieSearch;