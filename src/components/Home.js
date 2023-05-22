import React from 'react';
import MovieList from './MovieList.js';

const Home = () => {
  return (
    <div>
      <h1 style={{backgroundColor: 'orange', color: 'black', textAlign:'center'}}>StreamLag</h1>
      <MovieList />
    </div>
  );
};

export default Home;