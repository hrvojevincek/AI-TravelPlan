import { UNSPLASH_ACCESS_KEY } from "@/utils/constants";
const BASE_URL = "https://api.unsplash.com/";

export async function getRandomPhoto(criteria?: string) {
  const query = criteria ? `query=${criteria}` : "";
  const response = await fetch(`${BASE_URL}/photos/random?${query}`, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });
  const data = await response.json();
  return data.urls.regular;
}
