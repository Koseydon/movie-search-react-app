import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [noFavorites, setNoFavorites] = useState("");

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
    } else {
      setNoFavorites("Henüz favorilere bişi eklemedin");
    }
  };

  const deleteFavorite = (id) => {
    let movies = favoriteMovies.filter((m) => {
      return m.Id !== id;
    });
    localStorage.setItem("favorites", JSON.stringify(movies));
    setFavoriteMovies(movies);
  };

  const renderFavorites = favoriteMovies.map((m, i) => (
    <Card style={{ width: "220px", margin: "10px" }} key={i}>
      <Col>
        <Card.Img variant="top" src={m.Poster} />
        <Card.Body>
          <Card.Title>{m.Title}</Card.Title>
          <Card.Text>"{m.Year}</Card.Text>
          <Card.Text>{m.Rating}</Card.Text>
        </Card.Body>
      </Col>
      <Card.Footer>
        <Button
          size="sm"
          block
          variant="light"
          onClick={() => deleteFavorite(m.Id)}
        >
          Delete from Favorites
        </Button>
      </Card.Footer>
    </Card>
  ));

  return (
    <Container style={{ marginTop: "50px" }}>
      {!!noFavorites && <div>{noFavorites}</div>}
      <Row style={{ width: "120%", marginLeft: "-5%" }}>{renderFavorites}</Row>
    </Container>
  );
};

export default Favorites;
