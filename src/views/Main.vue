<template>
  <main class="main-page">
    <Menu />
    <transition name="appear">
      <component :is="popup" />
    </transition>
    <browser />
    <chat />
  </main>
</template>

<script setup>
import browser from "../components/broswer/browser.vue";
import chat from "../components/chat/chat.vue";
import Menu from "../components/menu/menu.vue";

import usePopups from "../composables/usePopups.js";

const { popup } = usePopups();
</script>

<script>
import {
  createPopup,
  newChannelPopup,
  newGroupPopup,
  contactsPopup,
  callsPopup,
  settingsPopup,
  resizer,
  userSettings,
} from "../components/popups/popups.js";

export default {
  components: {
    createPopup,
    newChannelPopup,
    newGroupPopup,
    contactsPopup,
    callsPopup,
    settingsPopup,
    resizer,
    userSettings,
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  overflow: hidden;
}
@keyframes appear {
  0% {
    opacity: 0;
    transform: translate(0, -50%);
  }
  100% {
    opacity: 1;
    transform: translate(50%, -50%);
  }
}
@keyframes disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(100%, -50%);
  }
}
.appear-enter-active {
  animation: appear 0.3s;
}
.appear-leave-active {
  animation: disappear 0.3s;
}
</style>
