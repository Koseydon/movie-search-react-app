import React from "react";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

const favorites = [];

const RenderMovies = ({ movies, imdbInfos }) => {
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

    if (!favorites.find((m) => m.Id === favoriteMovie.Id)) {
      favorites.push(favoriteMovie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(JSON.parse(localStorage.getItem("favorites")));
  };

  const movieList = movies.map((m, i) => (
    <Col key={i} md={3}>
      <Card key={i}>
        <Card.Img variant="top" src={m.Poster} />
        <Card.Body>
          <Card.Title>{m.Title}</Card.Title>
          <Card.Text>{m.Year}</Card.Text>
          <Card.Text>{renderImdbInfo(m.imdbID)}</Card.Text>
          <button onClick={() => addFavorites(m, renderImdbInfo(m.imdbID))}>
            Click Me
          </button>
        </Card.Body>
      </Card>
    </Col>
  ));
  return <div className="movie-list">{movieList}</div>;
};

export default RenderMovies;
