<script setup>
import { RouterView } from "vue-router";

const setBodyTheme = () => {
  const body = document.body;
  const cachedTheme = localStorage.getItem("theme");
  const theme = cachedTheme || "light";
  body.setAttribute("data-theme", theme);
};

setBodyTheme();
</script>
<template>
  <RouterView />
</template>

<style></style>
