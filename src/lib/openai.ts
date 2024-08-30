// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
//   organization: process.env.ORG_KEY,
// });
// const openai = new OpenAIApi(configuration);

// export default openai;

// import OpenAI from "openai";
// const openai = new OpenAI();

// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//             role: "user",
//             content: "Write a haiku about recursion in programming.",
//         },
//     ],
// });

// console.log(completion.choices[0].message);

import OpenAI from "openai";

export const openAIClient = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});
