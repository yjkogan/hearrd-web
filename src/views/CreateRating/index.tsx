import React from "react";
import { Link, useNavigate } from "react-router-dom";

import CreateRatingForm from "./CreateRatingForm";
import { Rating } from "../../components/Rating";
import RatingComparer, { ComparisonToSend } from "../CreateComparison";

export const CreateRating = () => {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    const newRating = data.rating;
    const nextComparison = data.next_comparison;
    if (!nextComparison) {
      navigate("/ratings/creation_complete", { state: { newRating } });
      return;
    } else {
      navigate(`/ratings/compare`, {
        state: { newRating, nextComparison },
      });
    }
  };

  return <CreateRatingForm onComplete={handleComplete} />;

  // if (newRating) {
  //   if (!nextComparison) {
  //     return (
  //       <div>
  //         Thanks for adding your first <strong>{newRating.type}</strong>!{" "}
  //         <Link to={`/ratings/create?rating_type=${newRating.type}`}>
  //           Rate another <strong>{newRating.type}</strong>
  //         </Link>{" "}
  //         to create a relative ranking."
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <RatingComparer
  //         newRating={newRating}
  //         nextComparison={nextComparison}
  //         setNextComparison={setNextComparison}
  //       />
  //     );
  //   }
  // } else {
  // return <CreateRatingForm onComplete={handleComplete} />;
  // }
};

export default CreateRating;
