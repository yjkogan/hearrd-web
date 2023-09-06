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
  const { username } = useUsername();

  React.useEffect(() => {
    if (!username) {
      return;
    }
    const fetchAndSetRatingsTypes = async () => {
      const response = await fetchRatingTypes(username);
      const data = await response.json();
      setRatingsTypes(data.rating_types);
    };

    fetchAndSetRatingsTypes();
  }, [username]);

  return (
    <div>
      <h1>Ratings Types</h1>
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
