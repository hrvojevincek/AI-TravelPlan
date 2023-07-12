import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";

export async function POST(request: Request) {
  const req = await request.json();
  const { email } = req;
  const plans = await prisma.search.findMany({
    where: {
      user: { email: email },
    },
  });
  console.log(plans);
  return NextResponse.json(plans);
}
