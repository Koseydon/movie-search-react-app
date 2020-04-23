import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const RenderMovies = ({ movies, imdbInfos }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    let fetchedMovies = [];
    if (localStorage.getItem("favorites") !== null) {
      let localFavorites = JSON.parse(localStorage.getItem("favorites"));
      localFavorites.forEach((m) => {
        fetchedMovies.push(m);
      });
      setFavoriteMovies(fetchedMovies);
    }
  };

  const renderImdbInfo = (id) => {
    const movie = imdbInfos.find((m) => m.data.imdbID === id);
    if (movie) {
      return movie.data.imdbRating;
    }
    return <>n/a</>;
  };

  const addFavorites = (movie, rating) => {
    const favoriteMovie = {
      Id: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Rating: rating,
    };

    if (!favoriteMovies.find((m) => m.Id === favoriteMovie.Id)) {
      let favorites = favoriteMovies;
      favorites.push(favoriteMovie);
      setFavoriteMovies(favorites);
    }

    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  };

  const movieList = movies.map((m, i) => (
    <Card style={{ width: "220px", margin: "10px" }} key={i}>
      <Col>
        <Card.Img
          style={{ width: "188px", height: "280px" }}
          variant="top"
          src={m.Poster}
        />
        <Card.Body>
          <Card.Title>{m.Title}</Card.Title>
          <Card.Text>Year: {m.Year}</Card.Text>
          <Card.Text>IMDb Rating: {renderImdbInfo(m.imdbID)}</Card.Text>
        </Card.Body>
      </Col>
      <Card.Footer>
        <Button
          block
          variant="light"
          onClick={() => addFavorites(m, renderImdbInfo(m.imdbID))}
        >
          Add to Favorites
        </Button>
      </Card.Footer>
    </Card>
  ));

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row style={{ width: "120%", margin: "-5%" }}>{movieList}</Row>
    </Container>
  );
};

export default RenderMovies;
