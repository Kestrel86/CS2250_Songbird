import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li>
          <Link to="/songbird">Songbird</Link>
        </li>
      </ul>
    </nav>
  );
}
