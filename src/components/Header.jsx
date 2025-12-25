
import React from "react";


import { Link } from "react-router-dom";
 

export default function Header() {
  return (
    <header
      style={{
        padding: "16px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Logo text */}
      <h2 style={{ margin: 0 }}>Digital Persona Generator</h2>

      {/* Simple navigation menu */}
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Home</Link>
        <Link to="/wizard">Wizard</Link>
        <Link to="/results">Results</Link>
        
      </nav>
    </header>
  );
}
