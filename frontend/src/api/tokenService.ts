type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const fetchAccessToken = async (): Promise<string> => {
  const adminUserName = "Venancio";
  const adminUserPassword = "Jones";

  const header = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  };

  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", adminUserName);
  formData.append("password", adminUserPassword);

  const tokenUrl = "http://localhost:58258/token";

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: header,
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const tokenResponse = (await response.json()) as TokenResponse;
  return tokenResponse.access_token;
};
