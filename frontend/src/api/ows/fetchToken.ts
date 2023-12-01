// local
import { token } from "../../data/token";

export const fetchToken = async () => {
  const tokenUrl = "http://localhost:58258/token";

  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", "Venancio");
  formData.append("password", "Jones");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token.");
  }

  const tokenResponse = (await response.json()) as token;

  return tokenResponse.access_token;
};
