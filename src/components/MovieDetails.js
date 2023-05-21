import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setMovie(response.data);
        console.log(movie.production_companies["0"].name)
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{movie.title}</h1>
      <p style={{marginTop: '10px'}}>Description du film : <br />{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Note du public : {movie.vote_average}</p>
      <p>Durée : {movie.runtime} min</p>
      <p>Langue d'origine : {movie.original_language}</p>
      <p>Les compagnies qui ont aidé à la production : <ul>
        {movie.production_companies.map(company => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul></p>
    </div>
  );
};

export default MovieDetails;
