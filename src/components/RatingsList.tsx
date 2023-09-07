import React from "react";
import { Link } from "react-router-dom";

import { Rating, RatingListItem } from "./Rating";

export const RatingsList = ({
  ratings,
  rating_type,
}: {
  ratings: Rating[];
  rating_type: string;
}) => {
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
            <RatingListItem key={rating.name} rating={rating} />
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
