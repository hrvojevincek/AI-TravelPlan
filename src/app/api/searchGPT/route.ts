import { openAIClient } from "@/lib/openai";
import { GPTparser } from "@/utils/GPTparser";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");

  const responsePrompt = `Please generate a detailed ${duration} day trip itinerary for ${destination}. 
  The itinerary should be structured as an array of arrays, where each sub-array represents one day of activities.
  Each activity or meal should be structured as an object with the following properties:
  - activity name: A string describing the activity or meal
  - address: The full address of the location
  - duration: A string in the format "start time - duration"

  Each day should typically include breakfast, 2-3 activities, lunch, 2-3 more activities, 
  and dinner.

    Format the response as follows:
    1. An array of 5 to 8 activities per day
    Here's an example of how each activity should be structured, and its very important that it is in this format:
        {
        "activity name": "Breakfast: The Breakfast Club",
        "address": "33 D'Arblay St, Soho, London W1F 8EU",
        "duration": "8:00 AM - 1 hour"
        }
        Please ensure that:
    1. The activities are varied and showcase the best of ${destination}
    2. The timings are realistic
    3. The addresses are accurate and specific
    4. The duration for each activity is appropriate
    Generate the full itinerary for all ${duration} days, maintaining this structure and format throughout. The response should be easily parseable as a JSON array of objects.
    `;

  try {
    const response = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 1200,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: responsePrompt,
        },
      ],
    });

    const result = response.choices[0].message?.content;

    const parsedResult = GPTparser(result);

    if (parsedResult && parsedResult.length > 0) {
      return NextResponse.json(parsedResult[0]);
    } else {
      return NextResponse.json({ error: "No valid result from GPT parser" });
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json({ error: String(error) });
  }
}
