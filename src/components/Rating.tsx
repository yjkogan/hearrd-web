export type Rating = {
  id: number;
  name: string;
  type: string;
  user_id: number;
  value: number;
};

export const RatingListItem = ({ rating }: { rating: Rating }) => {
  return (
    <li>
      <span>
        {rating.name} — {rating.value}
      </span>
    </li>
  );
};
