import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ MovieItem }) => {
  return (
    <Link to={`/movies/${MovieItem.id}`}>
      <img
        src={`https://image.tmdb.org/t/p/w500${MovieItem.poster_path}`}
        alt={MovieItem.title}
      />
    </Link>
  );
};

export default MovieItem;