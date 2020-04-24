import React, { useState } from "react";
import axios from "axios";
import RenderMovies from "./RenderMovies";
import Form from "react-bootstrap/Form";
import { Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Home.css";

const limit = 10;
const apiAddress = `http://omdbapi.com/?apikey=3b4bd31e&s=`;
const imdbApi = `http://omdbapi.com/?apikey=3b4bd31e&i=`;

const Home = () => {
  const [searchKey, setSearchKey] = useState("");
  const [yearKey, setYearKey] = useState("");
  const [typeKey, setTypeKey] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imdbInfos, setImdbInfos] = useState([]);

  const fetchMovies = (page = 1) => {
    if (searchKey.length) {
      setLoading(true);
      axios
        .get(
          `${apiAddress}${searchKey}&page=${page}&y=${yearKey}&type=${typeKey}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.Response === "True") {
            setMovies(res.data.Search);
            setTotalResults(res.data.totalResults);
            setError("");

            const promises = [];
            res.data.Search.forEach((m) => {
              promises.push(fetchImdbInfo(m.imdbID));
            });

            Promise.all(promises).then((res) => {
              setImdbInfos(res);
            });
          } else {
            setMovies("");
            setTotalResults(0);
            setError("There is no movie in that name has shot yet!");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("You should enter at least 1 character to search...");
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalResults / limit); i++) {
      pages.push(
        <Button
          style={{
            margin: "2px",
            padding: "2px 2px",
            backgroundColor: "#343a40",
            border: "none",
          }}
          key={i}
          onClick={() => fetchMovies(i)}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  const fetchImdbInfo = (id) => {
    return axios.get(imdbApi + id).then((res) => {
      return res;
    });
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Form className="form">
        <Form.Row>
          <Form.Group as={Col} md={12} lg={3}>
            <Form.Control
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  fetchMovies();
                }
              }}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              placeholder="Movie Title"
            />
          </Form.Group>

          <Form.Group as={Col} md={12} lg={3}>
            <Form.Control
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  fetchMovies();
                }
              }}
              value={yearKey}
              onChange={(e) => setYearKey(e.target.value)}
              type="number"
              placeholder="Year"
            />
          </Form.Group>

          <Form.Group as={Col} md={12} lg={3}>
            <Form.Control
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  fetchMovies();
                }
              }}
              onChange={(e) => setTypeKey(e.target.value)}
              as="select"
            >
              <option value=" ">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </Form.Control>
          </Form.Group>
          <div className="col-md-12 col-lg-1">
            <Button
              className="btn-block"
              md={12}
              size="sm"
              onClick={() => fetchMovies()}
              variant="primary"
              type="button"
              style={{
                height: "38px",
                btnBlock: true,
                backgroundColor: "#343a40",
                border: "none",
              }}
            >
              Search
            </Button>
          </div>
        </Form.Row>
      </Form>

      {!!error && <div>{error}</div>}

      {loading && <div>Looking for Movies...</div>}

      {!!movies.length && (
        <RenderMovies movies={movies} imdbInfos={imdbInfos} />
      )}

      {!!totalResults && (
        <ul style={{ width: "100%", marginTop: "50px", position: "relative" }}>
          {renderPagination()}
        </ul>
      )}
    </Container>
  );
};

export default Home;
