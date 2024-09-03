import { Activity } from "@/types";

export default async function getPlaceId(
  name: Activity[],
  city?: string
): Promise<any> {
  const apiUrl = name.map((activity) => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      `${activity["activity name"]}${city ? `, ${city}` : ""}`
    )}&inputtype=textquery&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  });

  const responses = await Promise.all(apiUrl.map((url) => fetch(url)));
  const datas = await Promise.all(responses.map((res) => res.json()));

  const results = datas.map((data) => {
    const id = data.results[0].place_id;
    const { lat, lng } = data.results[0].geometry.location;
    return { id, lat, lng };
  });

  const editorialResponses = await Promise.all(
    results.map((result) => fetch(`/api/places?placeId=${result.id}`))
  );

  const editorials = await Promise.all(
    editorialResponses.map((editorialres) => editorialres.json())
  );
  const info = editorials.map((editorial, index) => {
    return {
      editorial,
      lat: results[index].lat,
      lng: results[index].lng,
      activityName: name[index]["activity name"],
    };
  });

  return info;
}
