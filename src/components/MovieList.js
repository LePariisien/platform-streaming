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
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=22ac58ffbc1eadc600f5e2024e583e3f'
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
        setCategories(getCategories(response.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=22ac58ffbc1eadc600f5e2024e583e3f&language=fr-FR'
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
            <h2>{genreMap[category]}</h2>
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
