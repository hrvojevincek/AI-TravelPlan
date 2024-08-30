import { Activity, ResultData, ResultEdit } from "@/types";
import prisma from "../../lib/db";
import { openAIClient } from "@/lib/openai";

type GPTClientStrategy = {
  predict: (props: searchProps) => Promise<ResultData>;
  edit: (props: editProps) => Promise<ResultEdit>;
};

type searchProps = {
  destination: string;
  duration: string;
  preferences?: string | null;
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
  async predict({
    destination,
    duration,
    preferences,
  }: searchProps): Promise<any> {
    const prefText =
      preferences !== null
        ? `, when choosing activities take into account I like ${preferences}`
        : "";

    console.log("AVARILABLEs", destination, duration);

    const responsePrompt = `${duration} day trip to ${destination}${prefText}. Use "%%%" for delimiting days.
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

    //! IF WE SELECTED PREFERENCES
    if (preferences) {
      const savedPrefSearch = await prisma.search.findFirst({
        where: {
          destination: destination.toLowerCase(),
          duration: parseInt(duration),
          preferences: { equals: preferences?.split(", ").sort() },
        },
      });

      if (savedPrefSearch) {
        const parsedPrefSearch = JSON.parse(savedPrefSearch.response);
        parsedPrefSearch.forEach((data: Activity[]) =>
          data.forEach((item) => {
            return client.uniqueActivities.push(item["activity name"]);
          })
        );
        return parsedPrefSearch;
      }

      const prefResponse = await openAIClient.chat.completions.create({
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
      //if (userInfo) connect to user table
      if (prefResponse.choices[0].message.content) {
        const prefResponseObject = client.parseChatGPT(
          prefResponse.choices[0].message.content
        );

        const newPrefSearch = await prisma.search.create({
          data: {
            destination: destination.toLowerCase(),
            duration: parseInt(duration),
            response: JSON.stringify(prefResponseObject),
            preferences: preferences?.split(", ").sort(),
          },
        });

        prefResponseObject.forEach((day: Activity[]) => {
          day.forEach((activity: Activity) => {
            client.uniqueActivities.push(activity["activity name"]);
          });
        });
        console.log("prefResponseObject", prefResponseObject);
        return prefResponseObject;
      }
    }
    //! IF ITS IN DB
    const search = await prisma.search.findFirst({
      where: {
        destination: destination.toLowerCase(),
        duration: parseInt(duration),
        preferences: {
          isEmpty: true,
        },
      },
    });

    if (search?.response) {
      const data = JSON.parse(search?.response);
      data?.forEach((data: Activity[]) =>
        data.forEach((item) => {
          return client.uniqueActivities.push(item["activity name"]);
        })
      );

      return data;
    }

    //OPEN API KEY REQUEST
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

    // ? choices[0].message.content

    //if (userInfo) connect to user table
    if (response.choices[0].message.content) {
      const responseObject = client.parseChatGPT(
        response.choices[0].message.content
      );

      const savedSearch = await prisma.search.create({
        data: {
          duration: parseInt(duration),
          destination: destination.toLowerCase(),
          response: JSON.stringify(responseObject),
          preferences: [],
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
    console.log("here");

    try {
      const prompt = `suggest me another activity, but IT MUST NOT BE any of this: ${client.uniqueActivities.toString()}. Make it in the same ${destination} with duration ${duration}, the times CAN NOT overlap with other durations that day. Response should be in stricly JSON format and only add answers where it says answer and it needs to have format stated inside the parenthesis, everything in the same line and dont forget DONT FORGET QUOTATION MARKS, BRACKETS!!! : [{"activity name": answer, "duration": answer(24 hour format-24 hour format), "address": answer}]`;
      const response = await openAIClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        max_tokens: 350,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      console.log("response data bro", response);
      if (response.choices[0].message.content) {
        return response.choices[0].message.content;
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
      const prompt = `suggest me another activity that isn't any of these: ${activityNamesArray.join(
        ", "
      )}. It should be in ${destination} with a duration of ${duration}. The times must not overlap with other durations that day. Response should be in strictly JSON format and only add answers where it says answer. It needs to have the format stated inside the parentheses, everything on the same line. Don't forget quotation marks and brackets! Format: [{"activity name": answer, "duration": answer(24 hour format-24 hour format), "address": answer}]`;
      const response = await openAIClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 350,
      });

      if (response.choices[0].message.content) {
        return JSON.parse(response.choices[0].message.content);
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
  // TODO: Implement real strategy
  strategy = new MockGPTStrategy();
}

const client = new GPTClient(strategy);

export default client;
