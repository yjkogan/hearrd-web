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
  const [error, setError] = React.useState<string | undefined>(undefined);
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
          if (data.error) {
            setError(data.error);
          } else {
            onComplete(data);
          }
        });
      } else {
        setError(
          `Something went wrong. Response status was ${response.status}`
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">Error while saving: {error}</p>}
      <div className="border rounded p-4 bg-blue-50">
        <label className="block mb-2 font-medium">Rating Type</label>
        <input
          type="text"
          value={rating_type}
          onChange={(e) => setRatingType(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="border rounded p-4 bg-pink-50">
        <label className="block mb-2 font-medium">Rating Name</label>
        <input
          type="text"
          value={rating_name}
          onChange={(e) => setRatingName(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 p-2 text-white rounded shadow-lg"
      >
        Create Rating
      </button>
    </form>
  );
};

export default CreateRatingForm;
