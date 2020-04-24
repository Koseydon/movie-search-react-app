import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const RenderMovies = ({ movies, imdbInfos }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [addedMessage, setAddedMessage] = useState(false);
  const [existMessage, setExistMessage] = useState(false);

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

  const addFavorites = (event, movie, rating) => {
    event.stopPropagation();

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
      favoriteAdded();
    } else {
      favoriteExist();
    }
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  };

  const favoriteAdded = () => {
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2000);
  };

  const favoriteExist = () => {
    setExistMessage(true);
    setTimeout(() => {
      setExistMessage(false);
    }, 2000);
  };

  const defaultImage = (event) => {
    event.target.src = "https://crm.profaj.com/assets/img/placeholder.png";
  };

  const goImdb = (e, id) => {
    window.open(`https://www.imdb.com/title/${id}`, "_blank");
  };

  const movieList = movies.map((m, i) => (
    <Card
      onClick={(e) => goImdb(e, m.imdbID)}
      style={{ width: "220px", margin: "10px" }}
      key={i}
    >
      <Col>
        <Card.Img
          onError={(e) => defaultImage(e)}
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
          onClick={(event) => addFavorites(event, m, renderImdbInfo(m.imdbID))}
        >
          Add to Favorites
        </Button>
      </Card.Footer>
    </Card>
  ));

  return (
    <>
      <Alert
        variant="success"
        style={{
          top: "16px",
          right: "16px",
          textAlign: "center",
          width: "200px",
          position: "fixed",
          zIndex: "2",
        }}
        show={addedMessage}
      >
        Movie added to favorites!
      </Alert>
      <Alert
        variant="danger"
        style={{
          top: "16px",
          right: "16px",
          textAlign: "center",
          width: "200px",
          position: "fixed",
          zIndex: "2",
        }}
        show={existMessage}
      >
        This movie is already your favorite!
      </Alert>
      <Container style={{ marginTop: "100px" }}>
        <Row style={{ width: "120%", margin: "-5%" }}>{movieList}</Row>
      </Container>
    </>
  );
};

export default RenderMovies;
