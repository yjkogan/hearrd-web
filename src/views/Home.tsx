import React from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../contexts/user-context";

export const Home = () => {
  const { username } = useUsername();

  if (!username) {
    return (
      <div>
        <h2>Not logged in</h2>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Logged in as {username}</h2>
      <p>
        <Link to="/ratings">View ratings</Link>
      </p>
    </div>
  );
};

export default Home;
