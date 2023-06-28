import mock from './mock.json'

type GPTClientStrategy = {
  predict(input: string): Promise<string>
}

class MockGPTStrategy implements GPTClientStrategy {
  async predict(): Promise<any> {
    // Return your mock data here
    return mock
  }
}

class RealGPTStrategy implements GPTClientStrategy {
  async predict(): Promise<string> {
    // Here goes the real call to the GPT API
    // Let's suppose you have a function called requestToGptApi(input: string) that makes the real request

    // TODO: implement
    return Promise.resolve('TODO')
  }
}

class GPTClient {
  private strategy: GPTClientStrategy

  constructor(strategy: GPTClientStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: GPTClientStrategy) {
    this.strategy = strategy
  }

  async predict(input: string): Promise<string> {
    return this.strategy.predict(input)
  }
}

// Now you can create the client with the appropriate strategy
let strategy: GPTClientStrategy
if (process.env.NODE_ENV === 'development') {
  strategy = new MockGPTStrategy()
} else {
  strategy = new RealGPTStrategy()
}

export default new GPTClient(strategy)
