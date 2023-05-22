import { Request, Response } from "express";
import { getSearchResults, getMovieDetails } from "../services/movies.service";

export const searchMovies = async (req: Request, res: Response) => {
  const { title, type, year, page } = req.query;
  const key = `${title}-${type}-${year}-${page}`;
  const params = { s: title, type, y: year, page };
  const results = await getSearchResults(params, key);
  res.send(results);
};

export const getMovieDetailsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const params = { i: id };
  const results = await getMovieDetails(params, id);
  res.send(results);
};
