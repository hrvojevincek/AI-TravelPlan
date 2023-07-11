import { NextRequest, NextResponse } from "next/server";
import client from "../GPTClient";
import prisma from "../../../../db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");

  if (destination !== null && duration !== null) {
    const response = await client.predict({
      destination,
      duration,
    });
    return NextResponse.json(response);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const duration = searchParams.get("duration");
    if (request.body !== null && destination !== null && duration !== null) {
      const req = await request.json();
      console.log("BODY POST REQ ==>>", req);
      const { email, response } = req;
      const newUserPlanRelation = await prisma.search.create({
        data: {
          destination: destination.toLowerCase(),
          duration: parseInt(duration),
          response: JSON.stringify(response),
          user: { connect: { email: email } },
        },
      });
    }
    return NextResponse.json({ message: "plan saved" });
  } catch (e) {
    console.log(e);
  }
}
