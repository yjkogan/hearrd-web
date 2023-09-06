export function fetchRatingTypes(username: string): Promise<any> {
  return fetch(`/api/ratings-types?username=${username}`, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
}
