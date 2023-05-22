<script setup lang="ts">
import SearchBox from './components/SearchBox.vue';
</script>

<template>
  <div id="app" class="dark">
    <SearchBox />
    <router-view />
  </div>
</template>