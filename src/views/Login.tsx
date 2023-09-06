import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../contexts/user-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const { setUsername: setApplicationUsername } = useUsername();
  const navigate = useNavigate();

  const handleLogin = () => {
    setApplicationUsername(username);
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Discord Username"
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
