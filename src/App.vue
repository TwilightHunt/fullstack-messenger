<script setup>
import { onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

const setBodyTheme = () => {
  const body = document.body;
  const cachedTheme = localStorage.getItem("theme");
  const theme = cachedTheme || "light";
  body.setAttribute("data-theme", theme);
};

setBodyTheme();

onMounted(() => {
  router.push(localStorage.getItem("token") ? "/" : "/login");
});
</script>

<template>
  <RouterView />
</template>

<style></style>
