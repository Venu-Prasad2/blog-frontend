// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const history = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    history('/login');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">My Blog</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        

        {/* Show Create Post and Logout only if user is authenticated */}
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Show Login if not authenticated */}
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>

  );
};

export default Navbar;