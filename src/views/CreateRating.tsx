import React from "react";
import { useParams } from "react-router-dom";

import { Rating } from "../components/Rating";
import { useUsername } from "../contexts/user-context";
import { createRating } from "../api";

export const CreateRating = () => {
  const [newRating, setNewRating] = React.useState<Rating | undefined>(
    undefined
  );

  if (newRating) {
    return (
      <div>
        <div>id: {newRating.id}</div>
        <div>name: {newRating.name}</div>
        <div>type: {newRating.type}</div>
      </div>
    );
  } else {
    return <CreateRatingForm onComplete={setNewRating} />;
  }
};

const CreateRatingForm = ({
  onComplete,
}: {
  onComplete: (new_rating: Rating) => void;
}) => {
  const { rating_type: rating_type_param } = useParams();
  const [rating_type, setRatingType] = React.useState<string>(
    rating_type_param || ""
  );
  const [rating_name, setRatingName] = React.useState<string>("");
  const { username } = useUsername();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createRating({
      username: username as string,
      rating_type,
      rating_name,
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          onComplete(data.rating as Rating);
        });
      } else {
        // TODO: handle error
      }
    });
  };

  // This form has two inputs and a submit button
  // One input is for the rating_type and is prefilled from the parameter
  // The other input is for the rating_name
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

export default CreateRating;
