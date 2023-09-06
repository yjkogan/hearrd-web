import React from "react";
import { useParams } from "react-router-dom";

import { Rating } from "../components/Rating";
import { useUsername } from "../contexts/user-context";
// import { fetchRatings } from "../api";

export const CreateRating = () => {
  const [ratings, setRatings] = React.useState<Rating[]>([]);
  let { ratings_type } = useParams();
  const { username } = useUsername();

  return <div>TODO</div>;
};

export default CreateRating;
