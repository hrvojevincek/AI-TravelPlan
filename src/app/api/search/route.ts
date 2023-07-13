import { NextRequest, NextResponse } from "next/server";
import client from "../GPTClient";
import prisma from "../../../../db";
import * as Unsplash from "@/lib/unsplash";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const preferences = searchParams.get("preferences");
  const searchId = searchParams.get("searchId");
  if (searchId !== "null" && searchId !== null) {
    const savedPlan = await prisma.search.findUnique({
      where: {
        id: searchId,
      },
    });
    return NextResponse.json(JSON.parse(savedPlan?.response as string));
  }

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
    const searchId = searchParams.get("searchId");
    const req = await request.json();
    const { email, response, hasBeenChecked, update } = req;
    console.log("THIS IS SEARCHID ==>>", searchId);
    if (
      searchId !== null &&
      searchId !== "null" &&
      request.body !== null &&
      destination !== null &&
      duration !== null
    ) {
      if (update) {
        const updatedSearchIdPlan = await prisma.search.update({
          where: {
            id: searchId,
          },
          data: {
            response: JSON.stringify(response),
          },
        });
        return NextResponse.json({ message: "Plan updated correctly!" });
      }
      if (!update) {
        const image = await Unsplash.getRandomPhoto(destination.toLowerCase());
        console.log("image", image);
        const newSearchIdPlan = await prisma.search.create({
          data: {
            destination: destination.toLowerCase(),
            duration: parseInt(duration),
            response: JSON.stringify(response),
            user: { connect: { email: email } },
            image,
          },
        });
        return NextResponse.json({
          message: "New plan saved correctly!",
          searchId: newSearchIdPlan.id,
        });
      }
    }
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
          {
            message: "already has existing Plan",
            searchId: existingPlan[0].id,
          },
          { status: 201 }
        );
      }
      const newUserPlan = await prisma.search.create({
        data: {
          destination: destination.toLowerCase(),
          duration: parseInt(duration),
          response: JSON.stringify(response),
          user: { connect: { email: email } },
        },
      });
      return NextResponse.json({
        message: "New plan saved correctly!",
        searchId: newUserPlan.id,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
