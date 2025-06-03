import type { MedalApiResponse } from "../types/medals";


// This fetcher function is used to fetch medal data from the API.
export const fetcher = async (url: string): Promise<MedalApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || `HTTP error! Status: ${res.status}`);
  }
  return res.json();
};