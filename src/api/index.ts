export function fetchRatingTypes(username: string): Promise<any> {
  return fetch(`/api/ratings-types?username=${username}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
}

export function fetchRatings({
  username,
  ratings_type,
}: {
  username: string;
  ratings_type: string;
}): Promise<any> {
  return fetch(
    `/api/ratings?username=${username}&ratings_type=${ratings_type}`,
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
}
