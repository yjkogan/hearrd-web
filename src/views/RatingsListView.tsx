import React from "react";
import { useParams } from "react-router-dom";

import RatingsList from "../components/RatingsList";
import { Rating } from "../components/Rating";
import { useUsername } from "../contexts/user-context";
import { fetchRatings } from "../api";

/*
 * This component fetches a list of ratings from the API and
 * displays them in an ordered list.
 */
export const RatingsListView = () => {
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

  return <RatingsList ratings={ratings} rating_type={rating_type as string} />;
};

export default RatingsListView;
