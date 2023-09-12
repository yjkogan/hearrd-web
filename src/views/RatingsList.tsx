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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your {rating_type} ratings</h2>

      <Link
        to={`/ratings/create?rating_type=${rating_type}`}
        className="inline-block bg-blue-200 px-4 py-2 rounded hover:bg-blue-300 mb-4"
      >
        Rate More {rating_type}s
      </Link>

      {ratings.length === 0 && (
        <p>
          You have no ratings for {rating_type}s. Rate two items of this type to
          see a comparison!
        </p>
      )}

      {ratings.length > 0 && (
        <div>
          {ratings.length === 1 && (
            <p>You need to rate a second {rating_type} to see a comparison.</p>
          )}
          <ul className="list-disc pl-5 space-y-2">
            {ratings.map((rating: Rating) => (
              <RatingListItem
                key={rating.name}
                rating={rating}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RatingsList;
