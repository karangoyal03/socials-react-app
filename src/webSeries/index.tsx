import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
}

interface ApiResponse {
  results: TvShow[];
}

const WebSeries: React.FC = () => {
  const [shows, setShows] = useState<TvShow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<ApiResponse>('https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=43515a54cab0ed6a5d592829da890e96')
      .then(response => {
        setShows(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching the TV shows', error);
      });
  }, []);

  const handleDetailsClick = (show: TvShow) => {
    navigate(`/details/${show.id}`, { state: { show } });
  };

  return (
    <Container>
      <h1 className="my-4">Popular TV Shows</h1>
      <Row>
        {shows.map(show => (
          <Col key={show.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`} />
              <Card.Body>
                <Card.Title>{show.name}</Card.Title>
                <Card.Text>
                  {show.overview.length > 100 ? `${show.overview.substring(0, 100)}...` : show.overview}
                </Card.Text>
                <Button variant="primary" onClick={() => handleDetailsClick(show)}>
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WebSeries;
