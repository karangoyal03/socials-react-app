import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
 
interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}
 
const Details: React.FC = () => {
  const location = useLocation();
  const show = (location.state as any).show as TvShow;
 
  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`} />
        <Card.Body>
          <Card.Title>{show.name}</Card.Title>
          <Card.Text>{show.overview}</Card.Text>
          <Card.Text>First Air Date: {show.first_air_date}</Card.Text>
          <Card.Text>Rating: {show.vote_average}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
 
export default Details;