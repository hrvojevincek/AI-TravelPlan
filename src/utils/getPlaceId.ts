export default async function getPlaceId(
  name: string,
  city?: string
): Promise<any> {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    `${name}${city ? `, ${city}` : ""}`
  )}&inputtype=textquery&key=AIzaSyCCB6Ygzq1qrFozt9fOzQ-GjUBz6C_f9nk`;

  const res = await fetch(apiUrl);
  const data = await res.json();
  const id = data.results[0].place_id;

  const editorialRes = await fetch(`/api/places?placeId=${id}`);
  const editorial = await editorialRes.json();

  return editorial;
}
