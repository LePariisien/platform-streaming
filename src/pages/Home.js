import React from 'react';
import MovieList from '../components/MovieList.js';

function Home () {
  return (
    <div>
      <h1 style={{backgroundColor: 'orange', color: 'black', textAlign:'center'}}>StreamLag</h1>
      <MovieList />
    </div>
  );
};

export default Home;