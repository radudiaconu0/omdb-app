import dotenv from "dotenv";
dotenv.config();

export const config = {
  OMBD_APIKEY: process.env.OMDB_API_KEY,
  PORT: process.env.PORT,
  UPSTASH_REDIS_REST_URL:
    process.env.UPSTASH_REDIS_REST_URL || "redis://localhost:6379",
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",
};
