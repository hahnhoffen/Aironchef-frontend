import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Aironchef-icon.PNG';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-block logo-container">
        <img src={logo} alt="AironChef Logo" className="logo" />
        <span className="logo-text">AironChef</span>
      </div>
      <div className="header-block nav-container">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users-and-recipes">Users & Recipes</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-block right-container">
      </div>
    </header>
  );
}

export default Header;
