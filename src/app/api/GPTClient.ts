import { ResultData } from "@/types";
import prisma from "@/bd";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type GPTClientStrategy = {
  predict: (props: searchProps) => Promise<ResultData>;
};

type searchProps = {
  destination: string;
  duration: string;
};

class MockGPTStrategy implements GPTClientStrategy {
  async predict({ destination, duration }: searchProps): Promise<any> {
    // Return your mock data here
    const search = await prisma.search.findFirst({
      where: {
<<<<<<< HEAD
        destination: destination.toLowerCase(),
        duration: parseInt(duration),
=======
 >>>>>>> main
      },
    });
    if (search?.response) {
      const data = JSON.parse(search?.response);
      console.log(data, "CLIENT");
      return data;
    }
    // if (userInfo) connect to user table

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "say hello",
      temperature: 0,
      max_tokens: 849,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    //if (userInfo) connect to user table
    console.log(response.data);

    return JSON.parse("response.choices[0].text");
  }
}

class RealGPTStrategy implements GPTClientStrategy {
  // TODO change to real strategy
  async predict({ destination, duration }: searchProps): Promise<any> {
    // Return your mock data here
    const search = await prisma.search.findFirst({
      where: {
<<<<<<< HEAD
        destination: destination.toLowerCase(),
        duration: parseInt(duration),
=======n
      },
    });
    if (search?.response) {
      const data = JSON.parse(search?.response);
<<<<<<< HEAD
=======
     
      return data;
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
}

// Now you can create the client with the appropriate strategy
let strategy: GPTClientStrategy;
if (process.env.NODE_ENV === "development") {
  strategy = new MockGPTStrategy();
} else {
  strategy = new RealGPTStrategy();
}

const client = new GPTClient(strategy);

export default client;
