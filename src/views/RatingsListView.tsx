import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import RatingsList from "../components/RatingsList";
import { Rating } from "../components/Rating";
import { useUsername } from "../contexts/user-context";
import { fetchRatings } from "../api";

/*
 * This component fetches a list of ratings from the API and
 * displays them in an ordered list.
 */
export const RatingsListView = () => {
  const [ratings, setRatings] = React.useState<Rating[] | undefined>(undefined);
  let { rating_type } = useParams();
  const { username } = useUsername() as { username: string };
  const navigate = useNavigate();

  React.useEffect(() => {
    if (ratings && !ratings.length) {
      navigate(`/ratings/create?rating_type=${rating_type}`);
    }
  }, [ratings, rating_type, navigate]);

  React.useEffect(() => {
    if (!rating_type) {
      navigate("/ratings");
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
  }, [username, rating_type, navigate]);

  if (!ratings) {
    return <div>Loading...</div>;
  }

  return <RatingsList ratings={ratings} rating_type={rating_type as string} />;
};

export default RatingsListView;
