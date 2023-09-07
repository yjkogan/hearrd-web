import React from "react";

export type Rating = {
  id: number;
  name: string;
  type: string;
  user_id: number;
  value: number;
};

export const RatingListItem = ({
  rating,
  onDelete,
}: {
  rating: Rating;
  onDelete: (rating: Rating) => void;
}) => {
  return (
    <li>
      <span>
        {rating.name} — {rating.value}
      </span>
      <span>
        <button type="button" onClick={() => onDelete(rating)}>
          Delete
        </button>
      </span>
    </li>
  );
};
