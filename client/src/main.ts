import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { metaTagPlugin } from "@m-media/vue3-meta-tags";

const app = createApp(App);
import { createPinia } from "pinia";
const pinia = createPinia();

app.use(metaTagPlugin, {}, router).use(router).use(pinia).mount("#app");
