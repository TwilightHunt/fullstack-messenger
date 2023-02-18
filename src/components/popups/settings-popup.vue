<template>
  <transition name="fade" mode="out-in">
    <popup v-if="$route.path === '/settings'">
      <div class="settings">
        <header class="settings___header">
          <div class="settings__header__title">Settings</div>
          <div class="settings__header__tools">
            <v-icon class="settings__header__icon"> mdi-dots-vertical </v-icon>
            <v-icon class="settings__header__icon" @click="$emit('close')">
              mdi-close
            </v-icon>
          </div>
        </header>
        <div class="settings__user settings-section">
          <img
            src="https://i.pinimg.com/564x/4c/4d/b2/4c4db22cb1afabff04b360b606f185a1.jpg"
            alt=""
            class="settings__user__image"
          />
          <div class="settings__user__info">
            <div class="settings__user__info__username">
              {{ user.username }}
            </div>
            <div class="settings__user__info__email">{{ user.email }}</div>
          </div>
        </div>
        <div class="settings__general settings-section">
          <menuLink
            :color="'#ED9F20'"
            :icon="'mdi-account-circle'"
            @action="goTo('user')"
            >Edit profile</menuLink
          >
          <menuLink :color="'#F06964'" :icon="'mdi-bell-ring'"
            >Notification and sounds</menuLink
          >
          <menuLink :color="'#6DC534'" :icon="'mdi-lock'"
            >Privacy and Security</menuLink
          >
          <menuLink :color="'#56B3F5'" :icon="'mdi-chat'"
            >Chat Settings</menuLink
          >
          <menuLink :color="'#7595FF'" :icon="'mdi-folder'">Folders</menuLink>
          <menuLink :color="'#B580E2'" :icon="'mdi-database'"
            >Advanced</menuLink
          >
          <menuLink :color="'#6DC534'" :icon="'mdi-phone'"
            >Call Settings</menuLink
          >
          <menuLink :color="'#F2925B'" :icon="'mdi-web'">Language</menuLink>
        </div>
        <div class="settings__scale settings-section">
          <menuLink :color="'#ED9F20'" :icon="'mdi-eye'" withSlider
            >Default interface scale</menuLink
          >
          <div class="settings__scale__slider">
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              class="settings__scale__slider__input"
              v-model="scale"
            />
            <span class="settings__scale__slider__value">{{
              `${scale}%`
            }}</span>
          </div>
        </div>
        <div class="settings__links settings-section">
          <menuLink :color="'#56B3F5'" :icon="'mdi-help-circle'"
            >Messenger FAQ</menuLink
          >
          <menuLink :color="'#ED9F20'" :icon="'mdi-lightbulb'"
            >Messenger Feautures</menuLink
          >
          <menuLink :color="'#6DC534'" :icon="'mdi-message-text'"
            >Ask a question</menuLink
          >
        </div>
      </div>
    </popup>
    <userSettings v-else-if="$route.path === '/settings/user'" />
  </transition>
</template>

<script setup>
import popup from "./popup.vue";
import menuLink from "../menu/menu-link.vue";
import userSettings from "./user-settings-popup.vue";

import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { user } = storeToRefs(useUserStore());

const scale = ref(100);

const goTo = (path) => {
  router.push({ name: path });
};
</script>

<style lang="scss" scoped>
.settings {
  width: 490px;
}
.settings-section {
  background-color: var(--color-background-soft);
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
.settings___header {
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: var(--color-background-soft);
  align-items: center;
}
.settings__header__icon {
  margin-left: 20px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.settings__user {
  display: flex;
  align-items: center;
  padding: 15px 30px;
}
.settings__user__image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 20px;
}
.settings__user__info__username {
  font-weight: 600;
}
.settings__user__info__email {
  opacity: 0.5;
}
.settings__general {
  padding: 7px 0;
}
.settings__scale {
  padding: 7px 0;
}
.settings__links {
  padding: 7px 0;
}
.menu-link {
  padding: 7px 30px;
  &:hover {
    background-color: var(--color-background-soft-hover);
  }
}
.settings__scale__slider {
  margin: 0 30px;
  display: flex;
}
.settings__scale__slider__input {
  width: 100%;
}
.settings__scale__slider__value {
  margin-left: 15px;
}
.fade-leave-active {
  animation: fade 0.2s reverse;
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
.fade-enter-active {
  animation: appear 0.3s;
}
.fade-leave-active {
  animation: disappear 0.3s;
}
</style>
