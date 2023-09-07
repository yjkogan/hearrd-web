import React from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../../contexts/user-context";

const Logout = () => {
  const { setUsername } = useUsername();
  React.useEffect(() => {
    setUsername(undefined);
    localStorage.removeItem("username");
  }, [setUsername]);

  return (
    <div>
      <h1>You are now logged out</h1>
      <div>
        <Link to="/login">Log back in</Link>
      </div>
      <div>
        <Link to="/">Return home</Link>
      </div>
    </div>
  );
};

export default Logout;
