import axios from "../axios"; // Your axios configuration file
import { SearchParams } from "../interfaces/SearchParams";

export async function getMovies(): Promise<any> {
  const response = await axios.get("/api/movies");
  return response.data;
}

export async function getMovieDetails(id: string): Promise<any> {
  const response = await axios.get(`/api/movies/${id}`);
  return response.data;
}

export async function searchMovies(params: SearchParams): Promise<any> {
  const response = await axios.get("/api/movies", {
    params: {
      title: params.title,
      type: params.type,
      year: params.year,
      page: params.page,
    },
  });
  return response.data;
}
