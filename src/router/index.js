import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Main.vue";
import Auth from "../views/Auth.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Auth,
    },
    {
      path: "/register",
      name: "register",
      component: Auth,
    },
    {
      path: "/chat=:name",
      name: "chat",
      component: HomeView,
    },
  ],
});

export default router;
