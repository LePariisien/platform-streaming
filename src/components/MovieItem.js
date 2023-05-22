import React from 'react';
import { Link } from 'react-router-dom';

function MovieItem ({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div style={{display:'inline-block', padding:'15px'}}>
        <img
          style={{width: '150px'}}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
    </Link>
  );
};

export default MovieItem;
