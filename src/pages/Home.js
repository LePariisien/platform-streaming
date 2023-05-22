import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';

export default function Home () {
  return (
      <Link to="/" className="logo">
        <div style={{display:'flex', justifyContent:'center'}}>
          <img src={Logo} style={{height:'100px'}} />
          <h1 style={{backgroundColor: 'black', color: 'orange', textAlign:'center', fontFamily:'Maven bold',}}>StreamLag</h1>
        </div>
      </Link>
  );
}