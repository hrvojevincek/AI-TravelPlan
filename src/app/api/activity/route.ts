import { NextResponse } from "next/server";
import client from "../GPTClient";

export async function POST(request: Request) {
  const req = await request.json();
  const { activityNamesArray } = req;

  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");

  if (destination !== null && duration !== null) {
    const response = await client.edit({
      destination,
      duration,
      activityNamesArray,
    });

    return NextResponse.json(response);
  }
}
