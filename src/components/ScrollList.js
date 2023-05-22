import React from 'react';
import '../App.css';

function ScrollList ({ children }) {
  return <div className="scrollable-list">{children}</div>;
};

export default ScrollList;
