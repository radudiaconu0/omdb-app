<script setup lang="ts">
import { setTitle } from '@m-media/vue3-meta-tags';
import SearchBox from './components/SearchBox.vue';
setTitle('Home');
</script>

<template>
  <div id="app" class="dark">
    <SearchBox />
    <router-view />
  </div>
</template>