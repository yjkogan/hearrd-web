import React from "react";
import { useUsername } from "../contexts/user-context";
import { fetchRatingTypes } from "../api";
import { Link } from "react-router-dom";

/*
 * This component fetches a list of ratings types from the API and
 * displays them as links to the ratings list for that type.
 */
export const RatingsTypesList = () => {
  const [ratingsTypes, setRatingsTypes] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { username } = useUsername();

  React.useEffect(() => {
    if (!username) {
      return;
    }
    const fetchAndSetRatingsTypes = async () => {
      const response = await fetchRatingTypes(username);
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
    <div>
      <h1>Ratings Types</h1>
      {error && <div>{error}</div>}
      <ul>
        {ratingsTypes.map((type) => (
          <li key={type}>
            <Link to={`/ratings/${type}`}>{type}s</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingsTypesList;
