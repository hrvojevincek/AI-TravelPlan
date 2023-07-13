import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const DATABASE_URL = process.env.DATABASE_URL;

if (!process.env.UNSPLASH_ACCESS_KEY) {
  throw new Error("UNSPLASH_ACCESS_KEY is not defined");
}

export const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
