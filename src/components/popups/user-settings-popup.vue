<template>
  <popup>
    <div class="user-settings">
      <header class="user-settings__header">
        <v-icon
          class="user-settings__header__icon"
          @click="setActivePopup('settingsPopup')"
        >
          mdi-arrow-left
        </v-icon>
        <div class="user-settings__header__title">Edit profile</div>
      </header>
      <div class="user-settings__body">
        <fileUpload
          @onupload="openResizer"
          :default-image="profileImagePath()"
        />
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

import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user.js";
import { reactive } from "vue";
import usePopups from "../../composables/usePopups";
import useResizer from "../../composables/useResizer";

const { setActivePopup } = usePopups();
const { setImageSrc } = useResizer();

const { update } = useUserStore();
const { user } = storeToRefs(useUserStore());
const { profileImagePath } = useUserStore();

const data = reactive({
  username: user.value.username ?? "",
  bio: user.value.bio ?? "",
  rules: {
    required: (value) => !!value || "Required.",
    min: (v) => v.length >= 2 || "Min 2 characters",
  },
});

const updateData = async () => {
  await update({ username: data.username, bio: data.bio });
};

const openResizer = (event) => {
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);

  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;

    image.onload = () => {
      if (image.height < 400 || image.width < 400) {
        alert("Image must be at least 400x400px");
        return;
      }
      setActivePopup("resizer");
      setImageSrc(event.target.files[0]);
    };
  };
};
</script>

<style lang="scss" scoped>
@import "../../assets/mixins/action-btn.scss";
.user-settings {
  width: 490px;
  padding: 20px 30px;
}
.user-settings__header {
  display: flex;
  align-items: center;
}
.user-settings__header__icon {
  @include action-btn();
  margin-right: 20px;
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
