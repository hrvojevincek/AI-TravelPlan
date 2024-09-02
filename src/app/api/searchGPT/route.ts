import { openAIClient } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("we are in route searchgpt");
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");

  const responsePrompt = `${duration} day trip to ${destination}. Use "%%%" for delimiting days.
  the result should be formatted in this way:
  Day x:
  ---
  <Breakfast restaurant or bar>
  <Breakfast time and duration>
  <Breakfast address>
  $$$
  <Activity #1 name>
  <Activity #1 time and duration>
  <Activity #1 address>
  $$$
  <Lunch restaurant or bar>
  <Lunch time and duration>
  <Lunch address>
  $$$
  <Activity #2 name>
  <Activity #2 time and duration>
  <Activity #2 address>
  $$$
  <Dinner restaurant or bar>
  <Dinner time and duration>
  <Dinner address>
  %%%

  Answer after the ampersands line
  &&&&&&&`;

  try {
    const response = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 800,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: responsePrompt,
        },
      ],
    });

    const result = response.choices[0].message?.content;
    console.log("result type in route searchgpt", typeof result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json({ error: error });
  }
}
