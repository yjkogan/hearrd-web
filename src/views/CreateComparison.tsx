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
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        Which of these {newRating.type}s do you prefer?
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
        <div
          className="bg-white p-4 rounded shadow-lg flex-1 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleComparison({ isComparisonPreferred: false })}
        >
          <h2 className="font-bold text-xl mb-2">{newRating.name}</h2>
        </div>
        <h3 className="mx-6 text-xl">VS</h3>{" "}
        <div
          className="bg-white p-4 rounded shadow-lg flex-1 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleComparison({ isComparisonPreferred: true })}
        >
          <h2 className="font-bold text-xl mb-2">{nextComparison.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default RatingComparer;
