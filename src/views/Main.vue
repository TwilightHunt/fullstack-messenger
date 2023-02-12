<template>
  <main class="main-page">
    <browser />
    <chat />
  </main>
</template>

<script setup>
import browser from "../components/broswer/browser.vue";
import chat from "../components/chat/chat.vue";

// import { storeToRefs } from "pinia";
// import { useUserStore } from "../stores/user.js";
// const { user } = storeToRefs(useUserStore());
</script>

<style lang="scss">
.main-page {
  display: flex;
  overflow: hidden;
}
</style>
