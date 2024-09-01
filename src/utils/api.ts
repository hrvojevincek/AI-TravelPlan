import { ResultData } from "@/types";

export async function fetchSearchResults(
  destination: string,
  duration: string,
  preferences: string | undefined,
  searchId: string | null | undefined
): Promise<ResultData> {
  const url = searchId
    ? `/api/search?searchId=${searchId}`
    : `/api/search?destination=${destination}&duration=${duration}${
        preferences ? `&preferences=${preferences}` : ""
      }`;
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error fetching search results");
  }
  const result = (await response.json()) as ResultData;
  console.log("REPSONES FOR API IS OK !", result);
  return result;
}

export async function savePlan(
  email: string | undefined,
  result: ResultData,
  hasBeenChecked: boolean,
  update: boolean,
  preferences: string[],
  destination: string,
  duration: string,
  searchId: string | null
): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email,
    response: result,
    hasBeenChecked,
    update,
    preferences,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(
    `/api/search?destination=${destination}&duration=${duration}&searchId=${searchId}`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error("Error saving plan");
  }

  return await response.json();
}
