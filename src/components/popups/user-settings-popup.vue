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
        <fileUpload @onUpload="openResizer" />
        <v-text-field
          label="Username (required)"
          variant="underlined"
          color="primary"
          class="user-settings__input"
          v-model="data.username"
          :rules="[data.rules.required, data.rules.min]"
          @focusout="updateData"
        ></v-text-field>
        <v-text-field
          label="Bio"
          variant="underlined"
          color="primary"
          class="user-settings__input"
          maxlength="70"
          counter
          v-model="data.bio"
          @focusout="updateData"
        >
        </v-text-field>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from "./popup.vue";
import fileUpload from "../UI/file-upload.vue";
import fileResizer from "../popups/file-resizer.vue";
import { goBack } from "../../composables/useHistory.js";

import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import { reactive } from "vue";

const { update } = useUserStore();
const { user } = storeToRefs(useUserStore());

const data = reactive({
  username: user.value.username ?? "",
  bio: user.value.bio ?? "",
  rules: {
    required: (value) => !!value || "Required.",
    min: (v) => v.length >= 2 || "Min 2 characters",
  },
  isResizerOpened: false,
});

const onBackClick = () => {
  goBack();
};

const updateData = async () => {
  await update({ username: data.username, bio: data.bio });
};

const openResizer = () => {
  data.isResizerOpened = true;
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
