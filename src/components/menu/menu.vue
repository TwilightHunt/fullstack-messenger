<template>
  <div class="menu">
    <div class="menu__content">
      <header class="menu__header">
        <img
          :src="
            user.profileImage ??
            'https://avatarko.ru/img/kartinka/1/avatarko_anonim.jpg'
          "
          alt=""
          class="menu__header__profile-image"
        />
        <div class="menu__header__options menu-options">
          <div class="menu-options__username">{{ user.username }}</div>
          <v-icon class="menu-options__icon" :size="30">
            mdi-chevron-down
          </v-icon>
        </div>
      </header>
      <div class="menu__setings">
        <menuLink :color="'#56B3F5'" :icon="'mdi-account-multiple'"
          >New Group</menuLink
        >
        <menuLink :color="'#ED9F20'" :icon="'mdi-bullhorn'"
          >New Channel</menuLink
        >
        <menuLink :color="'#F06964'" :icon="'mdi-account'">Contacts</menuLink>
        <menuLink :color="'#6DC534'" :icon="'mdi-phone'">Calls</menuLink>
        <menuLink :color="'#56B3F5'" :icon="'mdi-bookmark'"
          >Saved Messages</menuLink
        >
        <menuLink :color="'#B580E2'" :icon="'mdi-cog'">Settings</menuLink>
        <menuLink
          :color="'#7595FF'"
          :icon="'mdi-moon-waning-crescent'"
          :withSlider="true"
          >Night Mode</menuLink
        >
      </div>
      <footer class="menu__footer">
        <div class="menu__footer__title">Messenger Web</div>
        <div class="menu__footer__version">Version 1.0.0 - About</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import menuLink from "./menu-link.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
const { user } = storeToRefs(useUserStore());
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  width: 340px;
  background-color: var(--color-background-mute);
}
.menu__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 25px 30px;
}
.menu__header {
  &::after {
    content: "";
    display: block;
    margin: 25px -30px;
    height: 1px;
    background-color: black;
    opacity: 0.3;
  }
}
.menu__header__profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.menu-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.menu-options__icon {
  opacity: 0.5;
}
.menu__setings {
  margin-bottom: auto;
}
.menu__footer__title {
  opacity: 0.5;
}
.menu__footer__version {
  opacity: 0.5;
  font-weight: 200;
}
</style>
