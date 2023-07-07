This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## CHAT GPT PROMPT

3 day trip to barcelona.
response should be in json format (an array of 3 day arrays with 3 activity objects) only add answers where it says answer and they should have the format stated inside the parenthesis, when choosing activities try and include the most known ones of the city:
[[{"activity name": answer,"duration": answer(24 hour format-24 hour format), "address": answer(for the location of the activity) },{"activity name": answer,"duration": answer(24 hour format-24 hour format), "address": answer(for the location of the activity) },{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity)}],[{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity)},{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity) },{"activity name": answer,"duration": answer(24 hour format-24 hour format), "address": answer(for the location of the activity) }],[{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity)},{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity)},{"activity name": answer,"duration": answer(24 hour format-24 hour format),"address": answer(for the location of the activity)}]]

use objects in react to change state
// { 0x06
// name: 'arol',
// age: 36,
// friends: [ 0x07
// { 0x08
// name: 'Hrvoje',
// age: 36,
// }, { 0x04
// name: 'Albert',
// age: 22
// }
// ]
// }

// return {
// ...person,
// friends: person.friends.map(f => {
// if(f.name === 'Hrvoje') {
// return {
// ...f,
// age: 37
// }
// }
// return f
// })
// }
