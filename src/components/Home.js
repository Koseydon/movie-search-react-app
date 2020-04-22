import React, { useState } from "react";
import axios from "axios";
import RenderMovies from "./RenderMovies";

const limit = 10;
const apiAddress = `http://omdbapi.com/?apikey=3b4bd31e&s=`;
const imdbApi = `http://omdbapi.com/?apikey=3b4bd31e&i=`;

const Home = () => {
  const [searchKey, setSearchKey] = useState("what we do in the shadows");
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
            setError("aradığın film henüz çekilmedi...");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("arama yapmak için en az 1 karakter girilmeli...");
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalResults / limit); i++) {
      pages.push(
        <button key={i} onClick={() => fetchMovies(i)}>
          {i}
        </button>
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
    <>
      <div>
        <input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <input value={yearKey} onChange={(e) => setYearKey(e.target.value)} />
        <select onChange={(e) => setTypeKey(e.target.value)}>
          <option value=" ">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        {/* <input value={typeKey} onChange={(e) => setTypeKey(e.target.value)} /> */}
        <button onClick={() => fetchMovies()}>Ara</button>
      </div>

      {!!error && <div>{error}</div>}

      {loading && <div>arama başlatıldı...</div>}

      {!!movies.length && (
        <RenderMovies movies={movies} imdbInfos={imdbInfos} />
      )}

      {!!totalResults && <ul>{renderPagination()}</ul>}
    </>
  );
};

export default Home;
