import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Rating } from "../components/Rating";
import { createComparison } from "../api";
import { useUsername } from "../contexts/user-context";

export type ComparisonToSend = {
  id: number;
  index: number;
  name: string;
};

export const RatingComparer = () => {
  const { username } = useUsername();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    newRating,
    nextComparison: nextComparisonFromState,
  }: { newRating: Rating; nextComparison: ComparisonToSend } = state;

  const [nextComparison, setNextComparison] = React.useState<ComparisonToSend>(
    nextComparisonFromState
  );

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
            navigate("/ratings/creation_complete", {
              state: { newRating, allRatings: data.new_ratings },
            });
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
