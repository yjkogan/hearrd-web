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
      <ol>
        {ratings.map((rating: Rating) => (
          <RatingListItem key={rating.name} rating={rating} />
        ))}
      </ol>
    </div>
  );
};

export default RatingsList;
