import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Rating, RatingListItem } from "../components/Rating";
import { useUsername } from "../contexts/user-context";
import { fetchRatings, deleteRating } from "../api";

const fetchAndSetRatings = async (
  username: string,
  rating_type: string,
  setRatings: any
) => {
  const response = await fetchRatings({
    username,
    rating_type: rating_type as string,
  });
  const data = await response.json();
  setRatings(data.ratings);
};

/*
 * This component fetches a list of ratings from the API and
 * displays them in an ordered list.
 */
export const RatingsList = () => {
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
    fetchAndSetRatings(username, rating_type, setRatings);
  }, [username, rating_type, setRatings, navigate]);

  const handleDelete = (rating: Rating) => {
    deleteRating({
      username,
      rating_name: rating.name,
      rating_type: rating.type,
    }).then(() => {
      fetchAndSetRatings(username, rating.type, setRatings);
    });
  };

  if (!ratings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{rating_type}s</h1>
      <div>
        <Link to={`/ratings/create?rating_type=${rating_type}`}>
          Rate another {rating_type}
        </Link>
      </div>
      {ratings.length > 0 && (
        <ol>
          {ratings.map((rating: Rating) => (
            <RatingListItem
              key={rating.name}
              rating={rating}
              onDelete={handleDelete}
            />
          ))}
        </ol>
      )}
      {ratings.length === 1 && (
        <p>
          You've only rated one {rating_type}. You need to rate at least two{" "}
          {rating_type}s to see a comparison.
        </p>
      )}
      {ratings.length === 0 && (
        <p>
          You haven't rated any {rating_type}s yet. You need to rate at least
          two {rating_type}s to see a comparison.
        </p>
      )}
    </div>
  );
};

export default RatingsList;
