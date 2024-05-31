export default function authHeader(accessToken) {
  if (accessToken) {
    return {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
