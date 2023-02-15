<template>
  <main class="main-page">
    <Menu />
    <createPopup
      v-if="$route.path === '/new-group'"
      inputTitle="Group name"
      positiveButton="Next"
      @negativeAction="goToMain"
      v-click-outside="goToMain"
    />
    <newChannelPopup
      v-if="$route.path === '/new-channel'"
      inputTitle="Channel name"
      @negativeAction="goToMain"
      v-click-outside="goToMain"
    />
    <contactsPopup
      v-if="$route.path === '/contacts'"
      @negativeAction="goToMain"
      v-click-outside="goToMain"
    />
    <callsPopup
      v-if="$route.path === '/calls'"
      @negativeAction="goToMain"
      v-click-outside="goToMain"
    />
    <browser />
    <chat />
  </main>
</template>

<script setup>
import browser from "../components/broswer/browser.vue";
import chat from "../components/chat/chat.vue";
import Menu from "../components/menu/menu.vue";

import {
  createPopup,
  newChannelPopup,
  contactsPopup,
  callsPopup,
} from "../components/popups/popups.js";
import { useRouter } from "vue-router";

const router = useRouter();

const goToMain = () => {
  router.push("/");
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  overflow: hidden;
}
</style>
