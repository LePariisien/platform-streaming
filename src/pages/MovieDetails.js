import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';

function MovieDetails () {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  async function fetchMovieDetails () {
    console.log('test 2')
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
    );
    console.log('test 3')
    setMovie(response.data);
    console.log(movie)
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <div className="movie">
      <Home />
        <div className="content">
          <div className="poster">
            <img className="poster-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' />
          </div>
            <div className="details">
              <h1 className="title">{movie.title}</h1><br /><br />
              <div style={{paddingLeft:'20px'}}>
                <p className="overview"><h3>Description du film : </h3>{movie.overview}</p>
                <p className="release-date"><h3>Date de sortie : </h3>{movie.release_date}</p>
                <p className="vote-average"><h3>Note du public : </h3>{movie.vote_average}</p>
                <p className="runtime"><h3>Durée : </h3>{movie.runtime} min</p>
                <p className="original-language"><h3>Langue d'origine : </h3>{movie.original_language}</p>
                <p><h3>Les compagnies qui ont aidé à la production :</h3></p>
                <ul className="production-companies">
                  {movie.production_companies.map(company => (
                    <li key={company.id}>{company.name}</li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
