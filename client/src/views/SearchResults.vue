<script setup lang="ts">
import { useMovieStore } from "../store/movie.ts";
import MovieCard from "../components/MovieCard.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { computed } from 'vue';

const maxButtons = 5;
const totalPages = computed(() => Math.floor(movieStore.totalResults / 10));

const showFirst = computed(() => movieStore.currentPage > maxButtons + 1);
const showLast = computed(() => movieStore.currentPage < totalPages.value - maxButtons);

const startPage = computed(() => {
  let start = movieStore.currentPage - Math.floor(maxButtons / 2);
  if (start < 1) start = 1;
  return start;
});

const endPage = computed(() => {
  let end = startPage.value + maxButtons - 1;
  if (end > totalPages.value) end = totalPages.value;
  return end;
});

const pages = computed(() => {
  const range = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push(i);
  }
  return range;
});

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

const jumpToPage = (page: number) => {
  movieStore.currentPage = page;
  movieStore.fetchMoviesBySearchParams();
};
</script>

<template>
  <div>
    <div v-if="movieStore.loadingMovies">
      <LoadingSpinner />
    </div>
    <div class="flex flex-wrap justify-around p-6 gap-6" v-else>
      <MovieCard v-for="movie in movieStore.searchResults" :key="movie.imdbID" :movie="movie"
        class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
    </div>

    <div class="flex justify-center mt-4" v-if="movieStore.totalResults > 10">
      <button class="px-4 py-2 mr-2 bg-blue-600 text-white" @click="prevPage"
        :disabled="movieStore.currentPage === 1">Previous</button>
      <button class="px-4 py-2 mr-2 bg-blue-600 text-white" @click="jumpToPage(1)" v-if="showFirst">1</button>
      <span v-if="showFirst">...</span>
      <button v-for="page in pages" :key="page" class="px-4 py-2 mr-2 bg-blue-600 text-white"
        :class="{ 'bg-blue-800': page === movieStore.currentPage }" @click="jumpToPage(page)">
        {{ page }}
      </button>
      <span v-if="showLast">...</span>
      <button class="px-4 py-2 mr-2 bg-blue-600 text-white" @click="jumpToPage(totalPages)" v-if="showLast">{{
        totalPages }}</button>
      <button class="px-4 py-2 ml-2 bg-blue-600 text-white" @click="nextPage"
        :disabled="movieStore.searchResults.length < 10">Next</button>
    </div>
  </div>
</template>
<style scoped>
.MovieCard {
  transition: transform 0.3s;
}

.MovieCard:hover {
  transform: scale(1.05);
}
</style>

