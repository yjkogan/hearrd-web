import React from "react";
import { useNavigate } from "react-router-dom";

import CreateRatingForm from "./CreateRatingForm";
import { Rating } from "../../components/Rating";
import RatingComparer, { ComparisonToSend } from "../CreateComparison";

export const CreateRating = () => {
  const navigate = useNavigate();
  const [ratingAndComparison, setRatingAndComparison] = React.useState<
    { newRating: Rating; nextComparison: ComparisonToSend } | undefined
  >(undefined);

  const handleComplete = (data: any) => {
    const newRating = data.rating;
    const nextComparison = data.next_comparison;
    if (!nextComparison) {
      navigate(`/ratings/${newRating.type}`);
      return;
    } else {
      setRatingAndComparison({ newRating, nextComparison });
    }
  };

  if (ratingAndComparison) {
    const { newRating, nextComparison } = ratingAndComparison;
    return (
      <RatingComparer
        newRating={newRating}
        initialComparison={nextComparison}
      />
    );
  } else {
    return <CreateRatingForm onComplete={handleComplete} />;
  }
};

export default CreateRating;
