import React from "react";
import { useNavigate } from "react-router-dom";

import { Rating } from "../components/Rating";
import { createComparison } from "../api";
import { useUsername } from "../contexts/user-context";

export type ComparisonToSend = {
  id: number;
  index: number;
  name: string;
};

type Props = {
  newRating: Rating;
  initialComparison: ComparisonToSend;
};

export const RatingComparer = ({ newRating, initialComparison }: Props) => {
  const { username } = useUsername();
  const navigate = useNavigate();

  const [nextComparison, setNextComparison] =
    React.useState<ComparisonToSend>(initialComparison);

  const handleComparison = ({
    isComparisonPreferred,
  }: {
    isComparisonPreferred: boolean;
  }) => {
    createComparison({
      username: username as string,
      rating_id: newRating.id,
      comparison: nextComparison,
      isComparisonPreferred,
    }).then((response) => {
      if (response.ok) {
        response.json().then((data: any) => {
          if (data.next_comparison) {
            setNextComparison(data.next_comparison);
            return;
          } else {
            navigate(`/ratings/${newRating.type}`);
            return;
          }
        });
      } else {
        // TODO: Handle error
      }
    });
  };
  return (
    <div>
      <h2>Which of these {newRating.type}s do you prefer?</h2>
      <div>
        <button
          type="button"
          onClick={() => handleComparison({ isComparisonPreferred: false })}
        >
          {newRating.name}
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleComparison({ isComparisonPreferred: true })}
        >
          {nextComparison.name}
        </button>
      </div>
    </div>
  );
};

export default RatingComparer;
