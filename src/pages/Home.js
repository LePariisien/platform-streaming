import React from 'react';
import MovieList from '../components/MovieList.js';

function Home () {
  return (
    <div>
      <h1 style={{backgroundColor: 'orange', color: 'black', textAlign:'center', fontFamily:'Maven bold'}}>StreamLag</h1>
      <MovieList />
    </div>
  );
};

export default Home;