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
    <li key={rating.name}>
      {rating.name} — {rating.value}
      <button
        className="ml-4 text-red-500 hover:text-red-700"
        onClick={() => onDelete(rating)}
      >
        Delete
      </button>
    </li>
  );
};
