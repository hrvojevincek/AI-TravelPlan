import { NextResponse } from "next/server";
import { openAIClient } from "@/lib/openai";

const responsePrompt = `4 day trip to London. Use "%%%" for delimiting days.
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

export async function POST(req: Request) {
  const { question } = await req.json();
  console.log(question);
  try {
    const completion = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: responsePrompt,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from OpenAI");
    }

    console.log("_________________________________", response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Error processing your request", details: error.message },
      { status: 500 }
    );
  }
}
