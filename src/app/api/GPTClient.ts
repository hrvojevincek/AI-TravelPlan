import { ResultData, ResultEdit } from "@/types";
import prisma from "../../../db";
import openai from "../../../openai";

type GPTClientStrategy = {
  predict: (props: searchProps) => Promise<ResultData>;
  edit: (props: editProps) => Promise<ResultEdit>;
};

type searchProps = {
  destination: string;
  duration: string;
};

type editProps = {
  destination: string;
  duration: string;
  activityNamesArray: string[] | [];
};

class MockGPTStrategy implements GPTClientStrategy {
  async predict({ destination, duration }: searchProps): Promise<any> {
    // Return your mock data here
    const search = await prisma.search.findFirst({
      where: {
        destination: destination.toLowerCase(),
        duration: parseInt(duration),
      },
    });
    if (search?.response) {
      const data = JSON.parse(search?.response);
      return data;
    }

    const prompt = `${duration} day trip to ${destination}. response should be in json format (an array of ${duration} day arrays with 3 activity objects) only add answers where it says answer and they should have the format stated inside the parenthesis, when choosing activities try and include the most known ones of the city, durations for activities inside the same activity array must not overlap: [[{"activity name": answer,"duration": answer(24 hour format-24 hour format), "address": answer(for the location of the activity) },{"activity name": answer,"duration": answer(24 hour format-24 hour format), "address": answer(for the location of the activity) },{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity)}]]`;
    // if (userInfo) connect to user table
    //OPEN API KEY REQUEST
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 800,
    });
    //if (userInfo) connect to user table
    if (response.data.choices[0].text !== undefined) {
      const savedSearch = await prisma.search.create({
        data: {
          duration: parseInt(duration),
          destination: destination.toLowerCase(),
          response: response.data.choices[0].text,
        },
      });
      return JSON.parse(response.data.choices[0].text);
    }
  }

  async edit({
    destination,
    duration,
    activityNamesArray,
  }: editProps): Promise<any> {
    try {
      const prompt = `suggest me another activity that isnt any of this ones ${activityNamesArray} in the same ${destination} with duration ${duration}, the durations should not overlap with other durations that day. response should be in json format and only add answers where it says answer and it needs to have format stated inside the parenthesis, everything in the same line like this: [{"activity name": answer, "duration": answer(24 hour format-24 hour format), address: answer}]`;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 350,
      });

      if (response.data.choices[0].text) {
        return JSON.parse(response.data.choices[0].text);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

class RealGPTStrategy implements GPTClientStrategy {
  async predict({ destination, duration }: searchProps): Promise<any> {
    // Return your mock data here
    const search = await prisma.search.findFirst({
      where: {
        destination: destination.toLowerCase(),
        duration: parseInt(duration),
      },
    });
    if (search?.response) {
      const data = JSON.parse(search?.response);
      return data;
    }
  }

  async edit({
    destination,
    duration,
    activityNamesArray,
  }: editProps): Promise<any> {
    try {
      const prompt = `suggest me another activity that isnt any of this ones ${activityNamesArray} in the same ${destination} with duration ${duration}, the durations should not overlap with other durations that day. response should be in json format and only add answers where it says answer and it needs to have format stated inside the parenthesis, everything in the same line like this: [{"activity name": answer, "duration": answer(24 hour format-24 hour format), address: answer}]`;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 350,
      });

      if (response.data.choices[0].text) {
        return JSON.parse(response.data.choices[0].text);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

class GPTClient {
  private strategy: GPTClientStrategy;

  constructor(strategy: GPTClientStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: GPTClientStrategy) {
    this.strategy = strategy;
  }

  async predict(input: searchProps) {
    return this.strategy.predict(input);
  }
  async edit(input: editProps) {
    return this.strategy.edit(input);
  }
}

let strategy: GPTClientStrategy;

if (process.env.NODE_ENV === "development") {
  strategy = new MockGPTStrategy();
} else {
  strategy = new RealGPTStrategy();
}

const client = new GPTClient(strategy);

export default client;
