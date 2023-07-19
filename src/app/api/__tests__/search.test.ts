jest.mock("next/server");
import { NextResponse } from "next/server";
import GPTClient from "../GPTClient";
jest.mock("../../../lib/openai");
import openai from "@/lib/openai";

import { GET } from "../search/route";
import prisma from "@/lib/db";

const mockResponse = {};
const fakeGPTResponse = `Day 1:
---
Bar del pla
8:00-9:00
False Street 123
$$$
Bar del pla
8:00-9:00
False Street 123
%%%`;
const parsedFakeGPTResponse = [
  [
    {
      "activity name": "Bar del pla",
      duration: "8:00-9:00",
      address: "False Street 123",
    },
    {
      "activity name": "Bar del pla",
      duration: "8:00-9:00",
      address: "False Street 123",
    },
  ],
];

beforeAll(() => {
  NextResponse.json = jest.fn();
  (NextResponse.json as jest.Mock).mockImplementation(() => mockResponse);

  (openai.createCompletion as jest.Mock).mockImplementation(() =>
    Promise.resolve({})
  );
});

describe("New search (no search id)", () => {
  beforeEach(async () => {
    await prisma.search.deleteMany({
      where: {},
    });
    (openai.createCompletion as jest.Mock).mockClear();
  });

  it("asks gpt and responds with a result", async () => {
    (openai.createCompletion as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          choices: [
            {
              text: fakeGPTResponse,
            },
          ],
        },
      })
    );

    // TODO: remove the preferences=null from the querystring
    const request = new Request(
      "http://localhost:3000/api/search?destination=Barcelona&duration=3&preferences=null"
    );

    const response = await GET(request);

    expect(response).toBe(mockResponse);
    expect(openai.createCompletion).toHaveBeenCalledTimes(1);
    expect(openai.createCompletion).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining(`3 day trip to Barcelona.`),
      })
    );
    expect(NextResponse.json).toHaveBeenCalledWith(parsedFakeGPTResponse);
  });

  it("Destination + duration exists in the database", async () => {
    const mockDBResponse =
      '[[{"activity name":"Walking Tour of Gothic Quarter","duration":"09:00-13:00","address":"Carrer de Fernández y González, 7, 08002 Barcelona,"},{"activity name":"Visit Sagrada Familia","duration":"13:00-17:00","address":"Carrer de Mallorca, 401, 08013 Barcelona,"},{"activity name":"Tibidabo Amusement Park","duration":"17:00-22:00","address":"Travessera de Dalt, s/n, 08035 Barcelona,"}],[{"activity name":"FC Barcelona Guided Tour","duration":"09:00-13:00","address":"Avinguda Joan Gaspart, 77, 08018 Barcelona,"},{"activity name":"La Boqueria Market","duration":"13:00-17:00","address":"La Rambla, 91, 08002 Barcelona,"},{"activity name":"Picnic At Park de la Ciutadella","duration":"17:00-20:00","address":"Passeig de Pujades, 1, 08003 Barcelona,"}],[{"activity name":"Barcelona Aquarium","duration":"10:00-13:00","address":"Moll d’Espanya del Port Vell, S/N, 08039 Barcelona,"},{"activity name":"Santa Maria del Mar Cathedral","duration":"13:00-17:00","address":"Plaça de Santa Maria, 1, 08003 Barcelona,"},{"activity name":"La Barceloneta Beach","duration":"17:00-22:00","address":"Moll de Gregal, 08003 Barcelona,"}]]';
    const plan = await prisma.search.create({
      data: {
        destination: "barcelona",
        duration: 3,
        response: mockDBResponse,
        preferences: [],
      },
    });

    // TODO: remove the preferences=null from the querystring
    const request = new Request(
      "http://localhost:3000/api/search?destination=Barcelona&duration=3&preferences=null"
    );

    const response = await GET(request);

    expect(openai.createCompletion).toHaveBeenCalledTimes(0);
    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining(JSON.parse(mockDBResponse))
    );
    expect(response).toBe(mockResponse);

    await prisma.search.delete({
      where: {
        id: plan.id,
      },
    });
  });

  it("GPT responds with an error", async () => {
    (openai.createCompletion as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          choices: [
            {
              text: `not a valid gpt response`,
            },
          ],
        },
      })
    );

    // TODO: remove the preferences=null from the querystring
    const request = new Request(
      "http://localhost:3000/api/search?destination=Barcelona&duration=3&preferences=null"
    );

    const response = await GET(request);

    expect(response).toBe(mockResponse);
    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
      }),
      expect.objectContaining({ status: 500 })
    );
  });
});
