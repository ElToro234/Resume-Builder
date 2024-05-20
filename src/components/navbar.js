import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Resume Generator</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/display">Display</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;