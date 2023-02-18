<template>
  <popup>
    <div class="user-settings">
      <header class="user-settings__header">
        <v-icon class="user-settings__header__icon" @click="onBackClick">
          mdi-arrow-left
        </v-icon>
        <div class="user-settings__header__title">Edit profile</div>
      </header>
      <div class="user-settings__body">
        <fileUpload />
        <v-text-field
          label="Username (required)"
          variant="underlined"
          color="primary"
          class="user-settings__input"
        ></v-text-field>
        <v-text-field
          label="Email"
          variant="underlined"
          color="primary"
          class="user-settings__input"
        ></v-text-field>
        <v-text-field
          label="Bio"
          variant="underlined"
          color="primary"
          class="user-settings__input"
          maxlength="70"
          counter
        ></v-text-field>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from "./popup.vue";
import fileUpload from "../UI/file-upload.vue";
import { goBack } from "../../composables/useHistory.js";

const onBackClick = () => {
  goBack();
};
</script>

<style lang="scss" scoped>
.user-settings {
  width: 490px;
  padding: 20px 30px;
}
.user-settings__header {
  display: flex;
  align-items: center;
}
.user-settings__header__icon {
  margin-right: 20px;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.user-settings__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-settings__input {
  width: 100%;
}
</style>
