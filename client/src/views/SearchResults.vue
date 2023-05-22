<script setup lang="ts">
import { useMovieStore } from "../store/movie.ts";
import MovieCard from "../components/MovieCard.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const movieStore = useMovieStore();

const prevPage = () => {
  if (movieStore.currentPage > 1) {
    movieStore.currentPage--;
    movieStore.fetchMoviesBySearchParams();
  }
};

const nextPage = () => {
  if (movieStore.searchResults.length === 10) {
    movieStore.currentPage++;
    movieStore.fetchMoviesBySearchParams();
  }
};
</script>

<template>
  <div>
    <div v-if="movieStore.loadingMovies">
      <LoadingSpinner />
    </div>
    <div class="flex flex-wrap justify-around" v-else>
      <MovieCard v-for="movie in movieStore.searchResults" :key="movie.imdbID" :movie="movie" />
    </div>

    <div class="flex justify-center mt-4" v-if="movieStore.searchResults?.length > 0">
      <button class="px-4 py-2 mr-2 bg-blue-600 text-white" @click="prevPage"
        :disabled="movieStore.currentPage === 1">Previous</button>
      <button class="px-4 py-2 ml-2 bg-blue-600 text-white" @click="nextPage"
        :disabled="movieStore.searchResults.length < 10">Next</button>
    </div>
  </div>
</template>
