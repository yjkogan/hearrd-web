import React from "react";
import { Link } from "react-router-dom";
import { useUsername } from "../contexts/user-context";

export const Home = () => {
  const { username } = useUsername();
  const isLoggedIn = !!username;
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 flex flex-col justify-center items-center text-white px-4">
      {/* Headline & Subheadline */}
      <h1 className="text-5xl font-bold mb-2 text-center">
        Rate. Rank. Revel: Discover How Your Favorites Stack Up!
      </h1>
      <p className="text-xl mb-8 text-center">
        The ultimate platform to rank and compare anything from bands to brands,
        flavors to films, and more!
      </p>

      {/* Imagery - Placeholder for now, replace with actual images/animations */}
      {/* <div className="mb-8 w-full flex justify-center">
        <div className="p-4 bg-white opacity-50 rounded-lg">
          <p className="text-black text-center">
            [Dynamic imagery/animations here]
          </p>
        </div>
      </div> */}

      {/* Benefits */}
      <div className="mb-8 w-full max-w-xl space-y-4 text-center mx-auto">
        <h3 className="text-2xl mb-4 font-semibold">Benefits</h3>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Endless Categories: From music to munchies, we've got it all!</li>
          <li>
            Personalized Rankings: See how your choices compare to the world!
          </li>
          <li>
            (Maybe someday) Community Insights: Discover trends and see what’s
            topping the charts!
          </li>
          <li>Intuitive Interface: Rating and ranking made simple and fun!</li>
        </ul>
      </div>

      {/* How It Works */}
      <div className="mb-8 w-full max-w-xl text-center mx-auto">
        <h3 className="text-2xl mb-4 font-semibold">How It Works:</h3>
        <ul className="list-decimal list-inside text-lg space-y-2">
          <li>Choose or Add a Category.</li>
          <li>Rate & Rank Your Favorites.</li>
          <li>See How They Stack Up & (maybe someday) Share with Friends!</li>
        </ul>
      </div>

      {/* Call to Action */}
      {isLoggedIn ? (
        <div className="flex flex-col items-center space-y-4">
          <span className="text-2xl font-semibold">Welcome, {username}!</span>
          <a
            href="/ratings"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            View My Ratings
          </a>
          <a href="/logout" className="text-red-500 hover:underline">
            Logout
          </a>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
