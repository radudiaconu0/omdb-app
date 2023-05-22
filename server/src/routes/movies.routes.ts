import express from "express";
import {
  searchMovies,
  getMovieDetailsController,
} from "../controllers/movies.controller";

const router = express.Router();

router.get("/", searchMovies);
router.get("/:id", getMovieDetailsController);

export default router;
