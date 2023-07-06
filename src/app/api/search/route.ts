import { NextRequest, NextResponse } from "next/server";
import client from "../GPTClient";
import { User } from "next-auth";
import prisma from "../../../../db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  if (destination !== null && duration !== null) {
    const response = await client.predict({ destination, duration });

    return NextResponse.json(response);
  }
  // else {
  // //   return NextResponse.json([]);
  // // }
}

interface SaveRequest {
  body: SaveRequestBody;
}

type SaveRequestBody = {
  searchId: string;
  user: User;
};

export async function POST(request: NextRequest & SaveRequest) {
  try {
    if (request.body !== null) {
      const req = await request.json();
      console.log("BODY POST REQ ==>>", req);
      const { user, searchId } = req;
      const newUserPlanRelation = await prisma.search.update({
        where: {
          id: searchId,
        },
        data: {
          users: { connect: { email: user.email } },
        },
      });
    }
    return NextResponse.json({ message: "plan saved" });
  } catch (e) {
    console.log(e);
  }
}
