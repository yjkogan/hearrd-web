import { Rating } from "../components/Rating";

export function fetchRatingTypes(username: string): Promise<any> {
  return fetch(`/api/rating_types?username=${username}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
}

export function fetchRatings({
  username,
  rating_type,
}: {
  username: string;
  rating_type: string;
}): Promise<any> {
  return fetch(`/api/ratings?username=${username}&rating_type=${rating_type}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
}

export function createRating({
  username,
  rating_type,
  rating_name,
}: {
  username: string;
  rating_type: string;
  rating_name: string;
}) {
  return fetch(`/api/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      username,
      rating_type,
      rating_name,
    }),
  });
}
