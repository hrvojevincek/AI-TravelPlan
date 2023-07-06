import { NextResponse } from "next/server";
import client from "../GPTClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const activityName = searchParams.get("activityName");
  const duration = searchParams.get("duration");

  if (activityName !== null && duration !== null) {
    const response = await client.edit({ activityName, duration });
    return NextResponse.json(response);
  }
}
