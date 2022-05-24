import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import axios from "axios";
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import App from "./App.vue";
import router from "./router";
//import "bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
axios.defaults.withCredentials = true;

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
  //return store;
});
const options: PluginOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};
app.use(Toast, options);
app.use(pinia);
app.use(router);

app.mount("#app");
