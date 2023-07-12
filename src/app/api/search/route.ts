import { NextRequest, NextResponse } from "next/server";
import client from "../GPTClient";
import prisma from "../../../../db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const preferences = searchParams.get("preferences");

  if (destination !== null && duration !== null) {
    const response = await client.predict({
      destination,
      duration,
      preferences,
    });
    return NextResponse.json(response);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const duration = searchParams.get("duration");
    const req = await request.json();
    const { email, response, hasBeenChecked, update } = req;
    if (request.body !== null && destination !== null && duration !== null) {
      const existingPlan = await prisma.search.findMany({
        where: {
          destination: destination?.toLowerCase(),
          duration: parseInt(duration),
          user: { email: email },
        },
      });

      if (existingPlan.length > 0 && !hasBeenChecked) {
        return NextResponse.json(
          { message: "already has existing Plan" },
          { status: 201 }
        );
      }
      if (update) {
        const updatedPlan = await prisma.search.updateMany({
          where: {
            destination: destination?.toLocaleLowerCase(),
            duration: parseInt(duration),
            user: { email: email },
          },
          data: {
            response: JSON.stringify(response),
          },
        });
        return NextResponse.json({ message: "Plan updated correctly!" });
      }
      const newUserPlan = await prisma.search.create({
        data: {
          destination: destination.toLowerCase(),
          duration: parseInt(duration),
          response: JSON.stringify(response),
          user: { connect: { email: email } },
        },
      });
    }
    return NextResponse.json({ message: "New plan saved correctly!" });
  } catch (e) {
    console.log(e);
  }
}
