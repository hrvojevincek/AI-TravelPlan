import { ResultData } from "@/types";
import mock from "./mock.json";
import prisma from "@/bd";

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
    const search = await prisma.search.findUnique({
      where: {
        destinationDuration: {
          destination: destination.toLowerCase(),
          duration: parseInt(duration),
        },
      },
    });
    if (search?.response) {
      const data = JSON.parse(search?.response);
      console.log(data, "CLIENT");
      return data;
    }
  }
}

class RealGPTStrategy implements GPTClientStrategy {
  async predict(input: searchProps): Promise<string> {
    // Here goes the real call to the GPT API
    // Let's suppose you have a function called requestToGptApi(input: string) that makes the real request

    // TODO: implement
    return Promise.resolve("TODO");
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
