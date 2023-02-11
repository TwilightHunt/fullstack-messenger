import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App).use(pinia).use(router).use(vuetify);

app.mount("#app");
