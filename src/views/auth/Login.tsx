import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../../contexts/user-context";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const { setUsername: setApplicationUsername } = useUsername();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationUsername(username);
    localStorage.setItem("username", username);
    navigate("/ratings");
  };

  return (
    <div className="flex items-center justify-center py-12">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-2xl w-96"
      >
        <h2 className="text-4xl mb-4 font-bold text-blue-500">Discord Login</h2>
        <p className="mb-4 text-gray-600">
          Enter your Discord username to proceed.
        </p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Username"
          required // Ensures the input is not empty when submitting.
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default Login;
