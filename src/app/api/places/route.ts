import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchId = searchParams.get("placeId");

  const detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${searchId}&fields=name,url,photo,rating,editorial_summary&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  const editorialRes = await fetch(detailsURL);
  const editorial = await editorialRes.json();

  return NextResponse.json(editorial);
}
