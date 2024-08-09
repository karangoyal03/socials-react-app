import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import Reviews from "./review";

const Details = () => {
  const { title } = useParams();
  const [searchResult, setSearchResult] = useState<any>({});

  const getResults = async () => {
    try {
      const res = await fetch(
        "https://www.omdbapi.com/?apikey=" +
          process.env.REACT_APP_API_KEY +
          "&t=" +
          title
      );
      const data = await res.json();
      setSearchResult(data);
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getResults();
  }, [title]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={searchResult?.Poster}
              alt={searchResult?.Title}
            />
            <Card.Body>
              <Card.Title>
                {searchResult?.Title} ({searchResult?.Year})
              </Card.Title>
              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td>Released on</td>
                    <td>{searchResult?.Released}</td>
                  </tr>
                  <tr>
                    <td>Run time</td>
                    <td>{searchResult?.Runtime}</td>
                  </tr>
                  <tr>
                    <td>Boxoffice</td>
                    <td>{searchResult?.BoxOffice}</td>
                  </tr>
                  <tr>
                    <td>Rated</td>
                    <td>{searchResult?.Rated}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-flex">
                {searchResult?.imdbRating > 0 &&
                  Array(Math.round(searchResult?.imdbRating))
                    .fill(null)
                    .map((_, i) => (
                      <FaStar className="text-warning" key={Math.random()} />
                    ))}
                {10 - Math.round(searchResult?.imdbRating) > 0 &&
                  Array(10 - Math.round(searchResult?.imdbRating))
                    .fill(null)
                    .map((_, i) => (
                      <FaStar className="text-secondary" key={Math.random()} />
                    ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="mb-3">
                <h2 className="text-primary">Director</h2>
                <p>{searchResult?.Director}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-primary">Plot</h2>
                <p>{searchResult?.Plot}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-primary">Awards</h2>
                <p>{searchResult.Awards}</p>
              </div>
            </Card.Body>
          </Card>
          <Reviews movieTitle={title || ""} />
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
