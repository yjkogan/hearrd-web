import React from "react";
import { useUsername } from "../contexts/user-context";
import { fetchRatingTypes } from "../api";
import { Link } from "react-router-dom";

/*
 * This component fetches a list of ratings types from the API and
 * displays them as links to the ratings list for that type.
 */
export const RatingsTypesList = () => {
  const [ratingsTypes, setRatingsTypes] = React.useState<string[] | undefined>(
    undefined
  );
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { username } = useUsername();
  const isLoading = ratingsTypes === undefined;

  React.useEffect(() => {
    if (!username) {
      return;
    }
    const fetchAndSetRatingsTypes = async () => {
      const response = await fetchRatingTypes(username);
      if (!response.ok) {
        setError(
          `Something went wrong. Response status was ${response.status}`
        );
        return;
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setRatingsTypes(data.rating_types);
      }
    };

    fetchAndSetRatingsTypes();
  }, [username]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your rating types</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching categories: {error}</p>
      ) : ratingsTypes.length ? (
        <ul className="list-disc pl-5 space-y-2">
          {ratingsTypes.map((type) => (
            <li
              key={type}
              className="transform transition-transform hover:translate-x-2"
            >
              <Link
                to={`/ratings/${type}`}
                className="text-blue-500 hover:underline"
              >
                {type}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Link
          to="/ratings/create"
          className="bg-blue-200 px-4 py-2 rounded hover:bg-blue-300"
        >
          Create Your First Rating!
        </Link>
      )}
    </div>
  );
};

export default RatingsTypesList;
