import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import ScrollableList from './ScrollableList';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const page1 = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`
        );
        const page2 = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}f&page=2`
        );
        const page3 = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}f&page=3`
        );
        const page4 = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=4`
        );
    
        const movies = [
          ...page1.data.results,
          ...page2.data.results,
          ...page3.data.results,
          ...page4.data.results,
        ];

        setMovies(movies);
        setFilteredMovies(movies);
        setCategories(getCategories(movies));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        );
        const genreMap = response.data.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
        setGenreMap(genreMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    filterMovies(searchTerm);
  }, [searchTerm]);

  const getCategories = (movies) => {
    const categoriesSet = new Set();
    movies.forEach((movie) => {
      movie.genre_ids.forEach((genreId) => {
        categoriesSet.add(genreId);
      });
    });

    return Array.from(categoriesSet);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterMovies = (searchTerm) => {
    if (searchTerm) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Rechercher un film..."
      />
      {searchTerm ? (
        <ScrollableList>
          {filteredMovies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ScrollableList>
      ) : (
        categories.map((category) => (
          <div key={category}>
            <h2 style={{textAlign: 'left'}}>{genreMap[category]}</h2>
            <ScrollableList>
              {filteredMovies
                .filter((movie) => movie.genre_ids.includes(category))
                .map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
            </ScrollableList>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;
