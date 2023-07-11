import { Activity, Day, ResultData, ResultEdit } from "@/types";
import prisma from "../../../db";
import openai from "../../../openai";
import { json } from "stream/consumers";

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

class GPTClient {
  private strategy: GPTClientStrategy;
  public uniqueActivities: string[] = [];

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
    const result = await this.strategy.edit(input);
    this.uniqueActivities = this.updateArray(
      this.uniqueActivities,
      input.activityNamesArray
    );
    return result;
  }

  public updateArray(
    uniqueActivities: string[],
    activityNamesArray: string[]
  ): string[] {
    uniqueActivities.sort();
    activityNamesArray.sort();
    return uniqueActivities.concat(
      activityNamesArray.filter((item) => !uniqueActivities.includes(item))
    );
  }

  public parseChatGPT(result: string) {
    console.log("PARSE FUNCTION", result);
    return result
      .split("%%%")
      .filter((a) => a.trim())
      .map((day) => {
        day = day.split("---\n")[1];
        return day
          .split("$$$")
          .map((e) => e.trim())
          .map((a) => {
            const [name, time, address] = a.split("\n");
            return {
              "activity name": name,
              duration: time,
              address,
            };
          });
      });
  }
}

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
      data?.forEach((data: Activity[]) =>
        data.forEach((item) => {
          return client.uniqueActivities.push(item["activity name"]);
        })
      );
      console.log(client.uniqueActivities);

      return data;
    }

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

    //OPEN API KEY REQUEST
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: responsePrompt,
      temperature: 1,
      max_tokens: 800,
    });
    //if (userInfo) connect to user table
    if (response.data.choices[0].text !== undefined) {
      const responseObject = client.parseChatGPT(response.data.choices[0].text);
      const savedSearch = await prisma.search.create({
        data: {
          duration: parseInt(duration),
          destination: destination.toLowerCase(),
          response: JSON.stringify(responseObject),
        },
      });
      responseObject.forEach((day: Activity[]) => {
        day.forEach((activity: Activity) => {
          client.uniqueActivities.push(activity["activity name"]);
        });
      });

      return responseObject;
    }
  }

  async edit({
    destination,
    duration,
    activityNamesArray,
  }: editProps): Promise<any> {
    client.uniqueActivities = client.updateArray(
      client.uniqueActivities,
      activityNamesArray
    );
    console.log(client.uniqueActivities);

    try {
      const prompt = `suggest me another activity, but IT MUST NOT BE any of this: ${client.uniqueActivities.toString()}. Make it in the same ${destination} with duration ${duration}, the times CAN NOT overlap with other durations that day. Response should be in stricly JSON format and only add answers where it says answer and it needs to have format stated inside the parenthesis, everything in the same line and dont forget DONT FORGET QUOTATION MARKS, BRACKETS!!! : [{"activity name": answer, "duration": answer(24 hour format-24 hour format), "address": answer}]`;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.8,
        max_tokens: 350,
      });

      if (response.data.choices[0].text) {
        return response.data.choices[0].text;
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

let strategy: GPTClientStrategy;

if (process.env.NODE_ENV === "development") {
  strategy = new MockGPTStrategy();
} else {
  strategy = new RealGPTStrategy();
}

const client = new GPTClient(strategy);

export default client;
