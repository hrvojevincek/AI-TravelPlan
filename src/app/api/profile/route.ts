import { getUserSearches } from "@/lib/db/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const { email } = req;
  const plans = await getUserSearches(email);
  console.log(plans);
  return NextResponse.json(plans);
}
