<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue';
import { useMovieStore } from '../store/movie';
import { highlightText, sanitizeHTML } from '../utils/helpers';
import { useRouter } from "vue-router";
import { Movie } from '../interfaces/Movie';
import { SearchInput } from '../interfaces/SearchInput';
import { onKeyStroke } from '@vueuse/core'
import { setTitle } from '@m-media/vue3-meta-tags';

const movieStore = useMovieStore();
const router = useRouter();
const searchBox = ref<HTMLDivElement | null>(null);

const searchParams = reactive<SearchInput>({
  title: '',
  type: '',
  year: '',
});

const isValidYear = (year: string) => /^[0-9]{4}$/.test(year);

const updateAndSearchMovies = async () => {
  if (!isValidYear(searchParams.year) && searchParams.year !== '') {
    console.error('Invalid year');
    return;
  }

  movieStore.updateSearchParams({ title: searchParams.title, type: searchParams.type, year: searchParams.year });

  try {
    await movieStore.searchMovies();
  } catch (error) {
    console.error(error);
  }
};

watch(searchParams, async () => {
  await updateAndSearchMovies();
});

const selectSearchItem = (item: Movie) => {
  movieStore.clearAutocompleteResults();
  router.push({ name: 'MovieDetail', params: { id: item.imdbID } });
};

const onSearchClick = async () => {
  if (!isValidYear(searchParams.year) && searchParams.year !== '') {
    alert('Invalid year');
    return;
  }

  movieStore.clearAutocompleteResults();
  movieStore.updateSearchParams(searchParams);

  try {
    await movieStore.fetchMoviesBySearchParams();
    setTitle('Search Results - ' + movieStore.searchParams.title);
    await router.push({ name: 'Home' });
  } catch (error) {
    console.error(error);
  }
};

const currentIndex = ref(-1);

const resultsList = ref<HTMLUListElement>();

onKeyStroke('ArrowDown', async () => {
  console.log(currentIndex.value);
  if (currentIndex.value < movieStore.autocompleteResults.length - 1) {
    currentIndex.value++;
  }
  await nextTick();
  resultsList.value?.children[currentIndex.value]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}, { target: searchBox, dedupe: false });

onKeyStroke('ArrowUp', async () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  await nextTick();
  resultsList.value?.children[currentIndex.value]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}, { target: searchBox, dedupe: false });

onKeyStroke('Enter', async () => {
  if (currentIndex.value > -1) {
    selectSearchItem(movieStore.autocompleteResults[currentIndex.value]);
  }
  await nextTick();
  resultsList.value?.children[currentIndex.value]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}, { target: searchBox, dedupe: false });

// Reset currentIndex when searchParams change
watch(searchParams, () => {
  currentIndex.value = -1
});

</script>

<template>
  <div class="dark:bg-gray-800 p-10 rounded-md" tabindex="0" ref="searchBox">
    <div class="mb-5 flex space-x-2 w-10 text-center">
      <input class="flex-grow justify-center dark:bg-gray-700 dark:text-white px-3 py-2 rounded-l-md transition-colors duration-200 ease-in-out hover:bg-gray-600"
        type="text" v-model="searchParams.title" placeholder="Search by title" />
      <select
        class="dark:bg-gray-700 dark:text-white px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-gray-600"
        v-model="searchParams.type">
        <option value="" disabled>Type</option>
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <input
        class="dark:bg-gray-700 dark:text-white px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-gray-600"
        type="text" v-model="searchParams.year" placeholder="Year" />
      <button
        class="dark:bg-blue-600 dark:text-white px-3 py-2 rounded-r-md transition-colors duration-200 ease-in-out hover:bg-blue-500"
        @click="onSearchClick">Search</button>
    </div>
    <aside
      class="absolute top-20 left-0 max-h-96 w-100 z-10 flex flex-col items-start bg-gray-900 border rounded-md shadow-md mt-1"
      role="menu" v-if="movieStore.autocompleteResults?.length > 0">
      <ul class="flex flex-col w-full overflow-y-scroll h-auto" ref="resultsList">
        <li
          class="flex items-center dark:text-white px-3 py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-600"
          v-for="(item, key) in movieStore.autocompleteResults" :key="key" @click="selectSearchItem(item)"
          :class="currentIndex == key ? 'dark:bg-gray-500' : 'dark:bg-gray-700'"
          >
          <img class="w-16 h-24 rounded-md object-cover mr-4" :src="item.Poster" :alt="item.Title" />
          <span v-html="highlightText(sanitizeHTML(item.Title), searchParams.title)"></span>
        </li>
      </ul>
    </aside>
  </div>
</template>
