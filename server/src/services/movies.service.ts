import axios from "axios";
import redis from "../redis/redis";
import { config } from "../config/config";

const fetchFromOMDB = async (params: any, key: string) => {
  const data = await redis.get(key);
  if (data) {
    return data;
  }
  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: config.OMBD_APIKEY,
        ...params,
      },
    });
    await redis.setex(key, 3600, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getSearchResults = (params: any, key: string) => {
  return fetchFromOMDB(params, key);
};

export const getMovieDetails = (params: any, key: string) => {
  return fetchFromOMDB(params, key);
};
