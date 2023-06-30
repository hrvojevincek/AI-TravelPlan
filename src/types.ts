export type SearchData = {
  destination?: string;
  duration?: string;
};

export type ResultData = Day[];

export type Day = Activity[];

export type Activity = {
  "activity name": string;
  duration: string;
  address: string;
};

export type ExactLocationProps = {
  address: string;
};

declare module '*.mp4' {
  const src: string;
  export default src;
}