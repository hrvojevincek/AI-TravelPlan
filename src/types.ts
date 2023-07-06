export type SearchData = {
  destination?: string;
  duration?: string;
};

export type ResultData = {
  id?: string;
  response?: Day[];
};

export type Day = Activity[];

export type Activity = {
  "activity name": string;
  duration: string;
  address: string;
};

export type ExactLocationProps = {
  address: string;
};

export type User = {
  username: string;
  email: string;
  image?: string;
};
