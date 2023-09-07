import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useUsername } from "../../contexts/user-context";
import { createRating } from "../../api";

export const CreateRatingForm = ({
  onComplete,
}: {
  onComplete: (new_rating: any) => void;
}) => {
  let [searchParams] = useSearchParams();
  const ratingTypeFromParams = searchParams.get("rating_type");
  const [rating_type, setRatingType] = React.useState<string>("");
  const [rating_name, setRatingName] = React.useState<string>("");
  const { username } = useUsername();

  useEffect(() => {
    setRatingType(ratingTypeFromParams || "");
  }, [ratingTypeFromParams]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createRating({
      username: username as string,
      rating_type,
      rating_name,
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          onComplete(data);
        });
      } else {
        // TODO: handle error
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rating_type">Rating Type</label>
      <input
        type="text"
        id="rating_type"
        name="rating_type"
        value={rating_type}
        onChange={(e) => setRatingType(e.target.value)}
      />
      <label htmlFor="rating_name">Rating Name</label>
      <input
        type="text"
        id="rating_name"
        name="rating_name"
        value={rating_name}
        onChange={(e) => setRatingName(e.target.value)}
      />
      <button type="submit">Rate!</button>
    </form>
  );
};

export default CreateRatingForm;
