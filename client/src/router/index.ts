import { createRouter, createWebHistory } from "vue-router";
import SearchResults from "../views/SearchResults.vue";
import MovieDetail from "../views/MovieDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: SearchResults,
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
