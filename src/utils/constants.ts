import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const DATABASE_URL = process.env.DATABASE_URL;

export default DATABASE_URL;
