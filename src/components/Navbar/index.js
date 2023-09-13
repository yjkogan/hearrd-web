import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../../contexts/user-context";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "My Ratings",
    path: "/ratings",
  },
  {
    name: "New Rating",
    path: "/ratings/create",
  },
];

const loginLink = {
  name: "Login",
  path: "/login",
};

const logoutLink = {
  name: "Logout",
  path: "/logout",
};

const Navbar = () => {
  const { username } = useUsername();
  const [menuOpen, setMenuOpen] = useState(false);

  const linksToShow = links.concat(username ? logoutLink : loginLink);

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Hearrd</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 text-white">
          {linksToShow.map((link) => (
            <li
              key={link.path}
              className="p-2 hover:bg-white hover:text-black rounded transition duration-300 ease-in-out cursor-pointer"
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Button */}
        <button
          aria-label="Open Menu"
          className="md:hidden flex flex-col items-center text-white w-6 h-6 justify-between"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-px bg-white"></span>
          <span className="w-6 h-px bg-white"></span>
          <span className="w-6 h-px bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-lg rounded mt-2 text-black">
          {linksToShow.map((link) => (
            <li
              key={link.path}
              className="p-2 hover:bg-gray-200 rounded transition duration-300 ease-in-out cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
