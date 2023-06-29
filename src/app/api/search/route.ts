import { NextResponse } from "next/server";
import client from "../GPTClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  if (destination !== null && duration !== null) {
    const response = await client.predict({ destination, duration });
    console.log(response, "WE ARE IDIOTS");
    return NextResponse.json(response);
  }
}
