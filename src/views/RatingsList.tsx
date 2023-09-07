import React from "react";
import { Link, useParams } from "react-router-dom";

import { Rating, RatingListItem } from "../components/Rating";
import { useUsername } from "../contexts/user-context";
import { fetchRatings } from "../api";

/*
 * This component fetches a list of ratings from the API and
 * displays them in an ordered list.
 */
export const RatingsList = () => {
  const [ratings, setRatings] = React.useState<Rating[]>([]);
  let { rating_type } = useParams();
  const { username } = useUsername();

  React.useEffect(() => {
    if (!username || !rating_type) {
      return;
    }
    const fetchAndSetRatings = async () => {
      const response = await fetchRatings({
        username,
        rating_type: rating_type as string,
      });
      const data = await response.json();
      setRatings(data.ratings);
    };

    fetchAndSetRatings();
  }, [username, rating_type]);

  return (
    <div>
      <h1>{rating_type}s</h1>
      <div>
        <Link to={`/ratings/create?rating_type=${rating_type}`}>
          Rate another {rating_type}
        </Link>
      </div>
      <ol>
        {ratings.map((rating: Rating) => (
          <RatingListItem key={rating.name} rating={rating} />
        ))}
      </ol>
    </div>
  );
};

export default RatingsList;
