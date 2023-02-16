<template>
  <main class="main-page">
    <Menu />
    <transition name="appear">
      <createPopup
        v-if="$route.path === '/new-group'"
        inputTitle="Group name"
        positiveButton="Next"
        @negativeAction="goToMain"
        v-click-outside="goToMain"
      />
    </transition>
    <transition name="appear">
      <newChannelPopup
        v-if="$route.path === '/new-channel'"
        inputTitle="Channel name"
        @negativeAction="goToMain"
        v-click-outside="goToMain"
      />
    </transition>
    <transition name="appear">
      <contactsPopup
        v-if="$route.path === '/contacts'"
        @negativeAction="goToMain"
        v-click-outside="goToMain"
      />
    </transition>
    <transition name="appear">
      <callsPopup
        v-if="$route.path === '/calls'"
        @negativeAction="goToMain"
        v-click-outside="goToMain"
      />
    </transition>
    <transition name="appear">
      <settingsPopup
        v-if="$route.path === '/settings'"
        @close="goToMain"
        v-click-outside="goToMain"
      />
    </transition>
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
  settingsPopup,
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
