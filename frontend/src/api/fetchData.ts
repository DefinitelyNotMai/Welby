export const fetchData = async (
  fetchUrl: string,
  params: Record<string | number, string | number | boolean> = {},
) => {
  try {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const urlWithQuery = `${fetchUrl}?${queryString}`;
    const mergedHeaders = {
      "Content-Type": "application/json",
    };

    const response = await fetch(urlWithQuery, {
      method: "GET",
      headers: mergedHeaders,
      //body: JSON.stringify(params),
      // NOTE: body not allowed for native fetch API, since this is a purely URL based
      // operation, place the data as a query string.
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
