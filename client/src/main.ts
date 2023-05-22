import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vue3StarRatings from "vue3-star-ratings";
const app = createApp(App);
import { createPinia } from "pinia";
const pinia = createPinia();

app.component("vue3-star-ratings", vue3StarRatings);
app.use(router).use(pinia).mount("#app");
