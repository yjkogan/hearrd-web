import React from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../../contexts/user-context";

const Navbar = () => {
  const { username } = useUsername();
  return (
    <nav>
      <h1>Hearrd</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ratings">My ratings</Link>
        </li>
        <li>
          <Link to="/ratings/create">New rating</Link>
        </li>
        {username && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
        {!username && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
