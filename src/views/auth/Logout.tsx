import React from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../../contexts/user-context";
import { ReactComponent as LogoutSVGComponent } from "../../assets/images/logout.svg";

const Logout = () => {
  const { setUsername } = useUsername();
  React.useEffect(() => {
    setUsername(undefined);
    localStorage.removeItem("username");
  }, [setUsername]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-blue-100 p-6 rounded-full">
          <LogoutSVGComponent />
        </div>

        <h2 className="text-xl font-bold text-gray-700 text-center">
          You're now logged out.
        </h2>

        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md"
        >
          Log back in
        </Link>
      </div>

      <Link to="/" className="text-blue-400 hover:text-blue-500 underline">
        Return to Home
      </Link>
    </div>
  );
};

export default Logout;
