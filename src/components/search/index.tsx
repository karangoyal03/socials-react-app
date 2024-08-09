import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";

const Search = () => {
  const location = useLocation();
  const [queryParams] = useSearchParams(location.search);
  const title = queryParams.get("title");
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
    <div>
      <h1 className="wd-heading mb-2">Search Results</h1>
      <Card className="mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <Card.Img variant="top" src={searchResult?.Poster} alt={searchResult.Title} />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title>{searchResult.Title} ({searchResult.Year})</Card.Title>
              <Card.Text>{searchResult.Plot}</Card.Text>
              <Card.Text className="text-muted">
                <small>{searchResult.Language}</small>
              </Card.Text>
              <div className="d-flex align-items-center">
                { searchResult?.imdbRating > 0 &&
                  Array(Math.round(searchResult?.imdbRating))
                    .fill(null)
                    .map(() => <FaStar className="text-warning" key={Math.random()} />)}
                {10 - Math.round(searchResult?.imdbRating) > 0 &&
                  Array(10 - Math.round(searchResult?.imdbRating))
                    .fill(null)
                    .map(() => <FaStar className="text-secondary" key={Math.random()} />)}
              </div>
              <Link to={"/details/" + title} className="mt-2">
                <Button variant="primary">
                  More Details
                </Button>
              </Link>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Search;
