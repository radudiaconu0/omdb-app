import { defineStore } from "pinia";
import {
  getMovieDetails,
  getMovies,
  searchMovies,
} from "../services/movie.service";
import { SearchParams } from "../interfaces/SearchParams";
import { Movie } from "../interfaces/Movie";
import { MovieDetails } from "../interfaces/MovieDetails";

export const useMovieStore = defineStore({
  id: "movie",
  state: () => ({
    loadingMovies: false,
    autocompleteResults: [] as Movie[],
    searchResults: [] as Movie[],
    currentMovie: {} as MovieDetails,
    movies: [] as Movie[],
    searchParams: {
      title: "",
      type: "",
      year: "",
    },
    totalResults: 0,
    currentPage: 1,
  }),
  actions: {
    async fetchMovies() {
      this.loadingMovies = true;
      this.movies = await getMovies();
      this.loadingMovies = false;
    },
    async fetchMovieDetails(id: string) {
      this.currentMovie = await getMovieDetails(id);
    },
    async searchMovies() {
      const params = {
        title: this.searchParams.title,
        type: this.searchParams.type,
        year: this.searchParams.year,
        page: this.currentPage,
      } as SearchParams;
      const response = await searchMovies(params);
      this.autocompleteResults = response.Search;
      this.totalResults = response.totalResults;
    },
    async fetchMoviesBySearchParams() {
      const params = {
        title: this.searchParams.title,
        type: this.searchParams.type,
        year: this.searchParams.year,
        page: this.currentPage,
      } as SearchParams;
      const response = await searchMovies(params);
      this.searchResults = response.Search;
      this.totalResults = response.totalResults;
    },
    clearAutocompleteResults() {
      this.autocompleteResults = [];
    },
    incrementPage() {
      this.currentPage += 1;
    },
    decrementPage() {
      this.currentPage -= 1;
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    updateSearchParams(params: { title: string; type: string; year: string }) {
      this.searchParams = params;
    },
    setSearchParams(params: { title: string; type: string; year: string }) {
      this.searchParams = params;
    },
  },
});
