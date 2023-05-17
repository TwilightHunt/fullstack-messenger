<template>
  <div class="menu _closed" @click="closeMenu" ref="menu">
    <div class="menu__body">
      <div class="menu__content">
        <header class="menu__header">
          <img :src="profileImagePath()" class="menu__header__profile-image" />

          <div class="menu__header__options menu-options" @click="expandOptions">
            <div class="menu-options__username">{{ user.username }}</div>
            <v-icon class="menu-options__icon" :size="30"> mdi-chevron-down </v-icon>
          </div>
        </header>
        <span class="menu__separator"></span>
        <div class="menu__wrapped-options">
          <menuLink :color="accentColor" :icon="'mdi-plus'" rounded>Add Account</menuLink>
        </div>
        <span class="menu__separator"></span>
        <div class="menu__setings">
          <menuLink
            :color="'#56B3F5'"
            :icon="'mdi-account-multiple'"
            @action="openPopup('newGroupPopup')"
            >New Group</menuLink
          >
          <menuLink :color="'#ED9F20'" :icon="'mdi-bullhorn'" @action="openPopup('newChannelPopup')"
            >New Channel</menuLink
          >
          <menuLink :color="'#F06964'" :icon="'mdi-account'" @action="openPopup('contactsPopup')"
            >Contacts</menuLink
          >
          <menuLink :color="'#6DC534'" :icon="'mdi-phone'" @action="openPopup('callsPopup')"
            >Calls</menuLink
          >
          <menuLink :color="'#56B3F5'" :icon="'mdi-bookmark'">Saved Messages</menuLink>
          <menuLink :color="'#B580E2'" :icon="'mdi-cog'" @action="openPopup('settingsPopup')"
            >Settings</menuLink
          >
          <menuLink
            :color="'#7595FF'"
            :icon="'mdi-moon-waning-crescent'"
            :withSlider="true"
            :checked="currentTheme === 'dark'"
            @action="toggleTheme"
            >Night Mode</menuLink
          >
        </div>
        <footer class="menu__footer">
          <div class="menu__footer__title">Messenger Web</div>
          <div class="menu__footer__version">Version 1.0.0 - About</div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import menuLink from "./menu-link.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import { ref } from "vue";
import usePopups from "../../composables/usePopups";

const { user } = storeToRefs(useUserStore());
const { profileImagePath } = useUserStore();
const style = getComputedStyle(document.body);
const accentColor = ref(style.getPropertyValue("--accent-color"));

const { setActivePopup } = usePopups();

const currentTheme = ref(localStorage.getItem("theme"));

const closeMenu = (event) => {
  const menu = document.querySelector(".menu");
  if (event.target === menu) {
    menu.classList.add("_closed");
  }
};

const expandOptions = () => {
  document.querySelector(".menu__header").classList.toggle("_expanded");
};

const toggleTheme = () => {
  const body = document.body;
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    currentTheme.value = "dark";
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    currentTheme.value = "light";
  }
};

const openPopup = (name) => {
  closeMenu();
  setActivePopup(name);
};
</script>

<style lang="scss" scoped>
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
.menu {
  background-color: rgba(#000, 0.6);
  position: absolute;
  inset: 0;
  z-index: 10;
  backdrop-filter: blur(2px);
  transition: all 0.2s ease;
  &._closed {
    visibility: hidden;
    opacity: 0;
    & .menu__body {
      transform: translateX(-100%);
    }
  }
}
.menu__body {
  position: relative;
  top: 0;
  bottom: 0;
  width: 340px;
  background-color: var(--color-background-mute);
  transition: all 0.2s ease-in;
}
.menu__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 25px 0;
}
.menu__separator {
  content: "";
  display: block;
  height: 1px;
  background-color: black;
  opacity: 0.3;
  &:first-of-type {
    display: none;
  }
}
.menu__header__profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.menu__header {
  padding: 15px 30px;
  padding-top: 0;
  &._expanded .menu-options__icon {
    transform: rotate(180deg);
  }
  &._expanded ~ .menu__wrapped-options {
    display: block;
    transform: translateY(0);
  }
  &._expanded + .menu__separator {
    display: block;
  }
}
.menu-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.menu__wrapped-options {
  padding: 10px 0;
  display: none;
  transform: translateY(-100%);
}
.menu-options__icon {
  opacity: 0.5;
  transition: transform 0.2s ease-in;
}
.menu__setings {
  margin-bottom: auto;
  padding: 15px 0;
}
.menu__footer {
  padding: 0 30px;
}
.menu__footer__title {
  opacity: 0.5;
}
.menu__footer__version {
  opacity: 0.5;
  font-weight: 200;
}
.menu-link {
  padding: 7px 30px;
  &:hover {
    background-color: var(--color-background-mute-hover);
  }
}
</style>
