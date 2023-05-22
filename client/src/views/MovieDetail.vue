<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { MovieDetails } from '../interfaces/MovieDetails.ts';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useMovieStore } from '../store/movie';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { watch } from 'vue';
import { setTitle } from '@m-media/vue3-meta-tags';

const router = useRoute();
const loading = ref(false);
const id = computed(() => router.params.id as string);
const movieData = ref<MovieDetails>();
const store = useMovieStore();
const fetchCurrentMovie = async () => {
  loading.value = true;
  await store.fetchMovieDetails(id.value);
  movieData.value = store.currentMovie;
  loading.value = false;
  setTitle(`${movieData.value.Title} (${movieData.value.Year})`);
}
onMounted(async () => {
  fetchCurrentMovie();
});
watch(
  () => router.params.id,
  async () => {
    fetchCurrentMovie();
  }
)
</script>

<template>
  <template v-if="loading">
    <LoadingSpinner />
  </template>
  <template v-else-if="movieData">
    <div class="dark:bg-gray-800 dark:text-white px-6 py-4 flex flex-col justify-center items-center space-y-5">
      <h1 class="text-4xl mb-2">{{ movieData.Title }} ({{ movieData.Year }})</h1>
      <img :src="movieData?.Poster" alt="Movie Poster" class="w-64">
      <div class="flex flex-row space-x-4 items-center">
        <!-- full star icon for high rating and half for low -->
        <Icon :icon="movieData.imdbRating >= 5.0 ? 'mdi:star' : 'mdi:star-half'" class="text-yellow-400 text-2xl" />
        <p class="text-xl">{{ movieData.imdbRating }} ({{ movieData.imdbVotes }} votes)</p>
      </div>
      <div class="mt-4 grid md:grid-cols-2 gap-4 text-lg">
        <div class="flex items-center space-x-2">
          <span class="font-bold">Director:</span>
          <span>{{ movieData.Director }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Writer:</span>
          <span>{{ movieData.Writer }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Actors:</span>
          <span>{{ movieData.Actors }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Plot:</span>
          <span>{{ movieData.Plot }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Genre:</span>
          <span>{{ movieData.Genre }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Language:</span>
          <span>{{ movieData.Language }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Country:</span>
          <span>{{ movieData.Country }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Awards:</span>
          <span>{{ movieData.Awards }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">DVD Release Date:</span>
          <span>{{ movieData.DVD }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-bold">Production:</span>
          <span>{{ movieData.Production }}</span>
        </div>
      </div>
      <p class="font-bold">Ratings:</p>
      <div v-for="review in movieData.Ratings">
        <div class="flex items-center space-x-2">
          <span class="font-bold">{{ review.Source }}:</span>
          <span>{{ review.Value }}</span>
        </div>
      </div>
    </div>
  </template>
</template>