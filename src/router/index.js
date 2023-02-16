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
      path: "/new-channel",
      name: "new-channel",
      component: HomeView,
    },
    {
      path: "/new-group",
      name: "new-group",
      component: HomeView,
    },
    {
      path: "/contacts",
      name: "contacts",
      component: HomeView,
    },
    {
      path: "/calls",
      name: "calls",
      component: HomeView,
    },
    {
      path: "/settings",
      name: "settings",
      component: HomeView,
      children: [
        {
          path: "user",
          name: "user",
          component: HomeView,
        },
      ],
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
  ],
});

export default router;
