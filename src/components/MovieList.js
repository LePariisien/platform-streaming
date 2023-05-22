import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import ScrollList from './ScrollList';

function MovieList () {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesName, setCategoriesName] = useState({});


  async function fetchMovies () {
    const page1 = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1&language=fr-FR`
    );
    const page2 = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=2&language=fr-FR`
    );
    const page3 = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=3&language=fr-FR`
    );
    const page4 = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=4&language=fr-FR`
    );
    const page5 = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=5&language=fr-FR`
    );
    // const page6 = await axios.get(
    //   `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=6&language=fr-FR`
    // );

    const movies = [
      ...page1.data.results,
      ...page2.data.results,
      ...page3.data.results,
      ...page4.data.results,
      ...page5.data.results,
      // ...page6.data.results,
    ];

    setMovies(movies);
    setFilteredMovies(movies);
    setCategories(getCategories(movies));
  }

  async function fetchCategories () {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
    );
    const categoriesName = response.data.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});
    setCategoriesName(categoriesName);
  }

  function getCategories (movies) {
    const categoriesSet = new Set();
    movies.forEach((movie) => {
      movie.genre_ids.forEach((genreId) => {
        categoriesSet.add(genreId);
      });
    })

    return Array.from(categoriesSet);
  }

  function handleSearch (e) {
    setSearchTerm(e.target.value);
  }

  function filterMovies (searchTerm) {
    if (searchTerm) {
      setFilteredMovies(movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredMovies(movies);
    }
  }

  useEffect(() => {
    fetchMovies();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterMovies(searchTerm);
  }, [searchTerm]);
  
  return (
    <div>
      <input
        style={{borderRadius:'5px', backgroundColor: 'orange', borderColor: 'black'}}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Rechercher un film..."
      />
      {searchTerm ? (
        <div style={{display:'inline-block', width:'auto', margin:'15px 0px 0px 15px'}}>
          {filteredMovies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        categories.map((category) => (
          <div key={category}>
            <h2 style={{textAlign: 'left'}}>{categoriesName[category]}</h2>
            <ScrollList>
              {filteredMovies
                .filter((movie) => movie.genre_ids.includes(category))
                .map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
            </ScrollList>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;