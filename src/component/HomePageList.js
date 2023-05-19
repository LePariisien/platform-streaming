import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  async function getData() {
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`)
    setMovies(res.data.results)
  }

  useEffect(() => {
    getData()
    console.log(process.env.REACT_APP_API_KEY)
  }, [])

  return (
    <div>
      <h1>Liste des films</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h1> {movie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;