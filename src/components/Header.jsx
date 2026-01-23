import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">✨</span>
          <span>Persona Gen</span>
        </Link>

        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/wizard" 
            className={`nav-link ${isActive('/wizard') ? 'active' : ''}`}
          >
            Wizard
          </Link>
          <Link 
            to="/results" 
            className={`nav-link ${isActive('/results') ? 'active' : ''}`}
          >
            Results
          </Link>
          <ThemeToggle />
          <Link to="/wizard" className="nav-cta">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
